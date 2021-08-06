/*
 * Copyright 2016 - 2017 Anton Tananaev (anton@traccar.org)
 * Copyright 2016 - 2017 Andrey Kunitsyn (andrey@traccar.org)
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

Ext.define('Traccar.view.dialog.ReportConfig', {
    extend: 'Traccar.view.dialog.Base',

    requires: [
        'Traccar.view.dialog.ReportConfigController',
        'Traccar.view.CustomTimeField'
    ],

    controller: 'reportConfig',
    title: Strings.reportConfigure,
    defaults: {
        minWidth: Traccar.Style.formFieldWidth + 100,
        maxWidth: Traccar.Style.formFieldWidth + 100
    },

    items: [{
        xtype: 'fieldcontainer',
        layout: 'hbox',
        reference: 'deviceGroupContainer',
        defaults: {
            minWidth: 60
        },
        items: [
            {
                xtype: 'tagfield',
                reference: 'deviceField',
                cls: 'rounded',
                store: 'Devices',
                valueField: 'id',
                emptyText: 'Select Objects..',
                mode: 'local',
                displayField: 'name',
                queryMode: 'local',
                flex: 2
            }, {
                xtype: 'splitter',
                minWidth: 2
            }, {
                emptyText: Strings.reportGroup,
                xtype: 'tagfield',
                reference: 'groupField',
                cls: 'rounded',
                store: 'Groups',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                flex: 2
            }
        ]
    }, {
        emptyText: Strings.reportEventTypes,
        xtype: 'tagfield',
        reference: 'eventTypeField',
        cls: 'rounded',
        store: 'ReportEventTypes',
        hidden: true,
        valueField: 'type',
        displayField: 'name',
        queryMode: 'local'
    }, {
        emptyText: Strings.reportChartType,
        xtype: 'combobox',
        reference: 'chartTypeField',
        cls: 'rounded',
        store: 'ReportChartTypes',
        hidden: true,
        value: 'speed',
        valueField: 'key',
        displayField: 'name',
        queryMode: 'local'
    }, {
        emptyText: Strings.reportPeriod,
        reference: 'periodField',
        cls: 'rounded',
        xtype: 'combobox',
        store: 'ReportPeriods',
        editable: false,
        valueField: 'key',
        displayField: 'name',
        queryMode: 'local',
        listeners: {
            change: 'onPeriodChange'
        }
    }, {
        xtype: 'fieldcontainer',
        layout: 'hbox',
        reference: 'fromContainer',
        hidden: true,
        emptyText: Strings.reportFrom,
        defaults: {
            minWidth: 60
        },
        items: [{
            xtype: 'datefield',
            reference: 'fromDateField',
            cls: 'rounded',
            startDay: Traccar.Style.weekStartDay,
            format: Traccar.Style.dateFormat,
            value: new Date(new Date().getTime() - 1080 * 60 * 1000),
            flex: 2
        }, {
            xtype: 'splitter',
            minWidth: 2
        }, {
            xtype: 'customTimeField',
            reference: 'fromTimeField',
            value: new Date(new Date().getTime() - 1080 * 60 * 1000),
            flex: 2
        }]
    }, {
        xtype: 'fieldcontainer',
        layout: 'hbox',
        reference: 'toContainer',
        hidden: true,
        emptyText: Strings.reportTo,
        defaults: {
            minWidth: 60
        },
        items: [{
            xtype: 'datefield',
            reference: 'toDateField',
            cls: 'rounded',
            startDay: Traccar.Style.weekStartDay,
            format: Traccar.Style.dateFormat,
            value: new Date(),
            flex: 2
        }, {
            xtype: 'splitter',
            minWidth: 2
        }, {
            xtype: 'customTimeField',
            reference: 'toTimeField',
            value: new Date(),
            flex: 2
        }]
    }, {
        boxLabel: Strings.reportShowMarkers,
        minWidth: 10,
        xtype: 'checkbox',
        reference: 'showMarkersField',
        inputValue: true,
        uncheckedValue: false,
        value: true
    }],

    buttons: [{
        glyph: 'xf00c@FontAwesome',
        tooltip: Strings.sharedSave,
        tooltipType: 'title',
        minWidth: 0,
        handler: 'onSaveClick'
    }, {
        glyph: 'xf00d@FontAwesome',
        tooltip: Strings.sharedCancel,
        tooltipType: 'title',
        minWidth: 0,
        handler: 'closeView'
    }]
});
