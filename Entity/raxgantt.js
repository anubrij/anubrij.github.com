(function ($) {
    $.extend(true, window, {
        BaseGantt: {
            BaseClientData: BaseClientData,
            BaseClientGrid: BaseClientGrid
        }
    });
    //Base class to provide common fuctionality to grid data model
    //Can be extended on entity level for further use. /* for example please see BpmObjectRegister.js
    function BaseClientData() {
        var _dataSource;
        var _columns;
        var _groupingDD = [];
        //Default options of Grid
        var _options = {
            editable: true,
            enableAddRow: false,
            enableCellNavigation: true,
            asyncEditorLoading: false,
            forceFitColumns: false,
            enableColumnReorder: false,
            frozenColumn: 3,
            enableAsyncPostRender: true,
            explicitInitialization: false,
            showHeaderRow: false
        };
        function setColumns(columns) {
            _columns = columns;
            
        };
        function setDataSource(dataSource) {
            _dataSource = dataSource;
        };
        
        function getColumns(columns) {
            return _columns;
        };
        function getDataSource() {
            return _dataSource;
        };
        function getOptions() {
            return _options;
        };
        
        $.extend(this, {
            "setColumns": setColumns,
            "setDataSource": setDataSource,
            
            "getColumns": getColumns,
            "getDataSource": getDataSource,
            "getOptions": getOptions
            
        });
    }

    function BaseClientGrid(baseClientData) {
        if (typeof (baseClientData) == 'undefined') return;
        var _ID;
        var $dataView;
        var $grid;
        var $columns;
        var $options;
        var _uniqueID;
        var $columnFilters = {};
        var $isTextSearch = false;
        var $sortdir;
        var $sortcol;
        var $groupingDD;
        $columns = baseClientData.getColumns();
        $options = baseClientData.getOptions();
       
        var $selfobj = this;
        function setID(ID) {
            _ID = ID;
        };
        function getGridObj() {
            return $grid;
        };
       
        function sortGrid(a, b) {
            var x = a[$sortcol], y = b[$sortcol];
            return (x == y ? 0 : (x > y ? 1 : -1));
        }
        function filterData(item) {
            return true;
        }

        function Render() {
          
            $dataView = new Remote.Data.DataView({
                inlineFilters: false
            });
            

            $grid = new Remote.Grid("#" + _ID, $dataView, $columns, $options);
           
            $dataView.onRowCountChanged.subscribe(function (e, args) {
                $grid.updateRowCount();
                $grid.render();
            });
            $dataView.onRowsChanged.subscribe(function (e, args) {
                $grid.invalidateRows(args.rows);
                $grid.render();
            });
            $grid.onSort.subscribe(function (e, args) {
                $sortdir = args.sortAsc ? 1 : -1;
                $sortcol = args.sortCol.field;
                $dataView.sort(sortGrid, args.sortAsc);
            });
            
            $dataView.beginUpdate();
            $dataView.setItems(baseClientData.getDataSource());
            if (this.requiredGrouping) {
                setGrouping();
            }
            $dataView.setFilter(this.filterData);
            $dataView.endUpdate();
            return $grid;
        };
        $.extend(this, {
            "setID": setID,
            "getGridObj": getGridObj,
            "Render": Render,
            
            "filterData": filterData
        });
    }

}($raxQuery.$));
