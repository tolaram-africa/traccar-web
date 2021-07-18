/*
 * Copyright 2015 - 2016 Anton Tananaev (anton@traccar.org)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Traccar.view.Report', {
    extend: 'Ext.panel.Panel',
    xtype: 'reportView',

    requires: [
        'Traccar.view.ReportController',
        'Traccar.view.GridPanel'
    ],

    controller: 'report',

    title: Strings.reportTitle,

    tools: [{
        type: 'close',
        tooltip: Strings.sharedHide,
        handler: 'hideReports'
    }],

    tbar: {
        scrollable: true,
        items: [

            /*
             *     {
             *     xtype: 'tbtext',
             *     html: Strings.sharedType
             * },
             */
            {
                xtype: 'combobox',
                reference: 'reportTypeField',
                emptyText: 'Select Report',
                store: 'ReportTypes',
                displayField: 'name',
                valueField: 'key',
                editable: false,
                listeners: {
                    change: 'onTypeChange'
                }
            }, '-', {
                text: Strings.reportConfigure,
                glyph: 'f0b0@FontAwesome',
                handler: 'onConfigureClick'
            }, '-', {
                // Text: Strings.reportShow,
                glyph: 'f021@FontAwesome',
                reference: 'showButton',
                disabled: true,
                handler: 'onReportClick'
            }, '-', {
                // Text: Strings.reportExport,
                reference: 'exportButton',
                glyph: 'xf1c3@FontAwesome',
                disabled: true,
                handler: 'onReportClick'
            }, '-', {
                // Text: Strings.reportEmail,
                reference: 'emailButton',
                glyph: 'xf003@FontAwesome',
                disabled: true,
                handler: 'onReportClick'
            }, '-', {
                // Text: Strings.reportClear,
                glyph: 'f1f8@FontAwesome',
                handler: 'onClearClick'
            }, '-']
    },

    layout: 'card',

    items: [{
        xtype: 'customGridPanel',
        itemId: 'grid',
        listeners: {
            selectionchange: 'onSelectionChange'
        },
        features: [
            {
                ftype: 'grouping',
                hasFeatureEvent: false,
                groupHeaderTpl: [
                    '{name}'
                ]
            }
        ],
        columns: {
            defaults: {
                flex: 0,
                minWidth: 60,
                sortable: true,
                resizable: false,
                fixed: true,
                autoSizeColumn: true
            },
            items: [
            ]
        },
        style: Traccar.Style.reportGridStyle
    }, {
        xtype: 'cartesian',
        itemId: 'chart',
        plugins: {
            ptype: 'chartitemevents',
            moveEvents: true
        },
        store: 'ReportRoute',
        axes: [{
            title: Strings.reportChart,
            type: 'numeric',
            position: 'left'
        }, {
            type: 'time',
            position: 'bottom',
            fields: ['fixTime']
        }],
        listeners: {
            itemclick: 'onChartMarkerClick'
        },
        insetPadding: Traccar.Style.chartPadding
    }]
});
