/*
 * Copyright 2015 - 2017 Anton Tananaev (anton@traccar.org)
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

Ext.define('Traccar.view.Main', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.main',

    requires: [
        'Traccar.view.MainController',
        'Traccar.view.edit.Devices',
        'Traccar.view.State',
        'Traccar.view.Report',
        'Traccar.view.Events',
        'Traccar.view.map.Map',
        'Traccar.view.edit.Geofences'
    ],

    controller: 'mainController',

    layout: 'border',

    defaults: {
        header: false,
        collapsible: true,
        split: true
    },

    items: [
        {
            region: 'west',
            xtype: 'tabpanel',
            tabPosition: 'bottom',
            glyph: 'xf192@FontAwesome',
            bodyPadding: 0,
            padding: 0,
            tabBar: {
                layout: {
                    pack: 'center'
                }
            },
            activeTab: 0,
            width: Traccar.Style.deviceWidth,
            stateful: true,
            stateId: 'sideViewPanel',
            titleCollapse: true,
            scrollable: false,
            items: [
                {
                    layout: 'border',
                    title: Strings.devicesAndState,
                    glyph: 'xf192@FontAwesome',
                    reference: 'deviceStateView',
                    defaults: {
                        split: true,
                        flex: 1
                    },
                    items: [{
                        region: 'center',
                        xtype: 'devicesView'
                    }, {
                        region: 'south',
                        xtype: 'stateView'
                    }]
                },
                {
                    xtype: 'geofencesView',
                    reference: 'geofencesView',
                    glyph: 'xf21d@FontAwesome',
                    title: Strings.sharedGeofences
                },
                {
                    xtype: 'eventsView',
                    reference: 'eventsView',
                    glyph: 'xf0f3@FontAwesome',
                    title: 'Activities'
                }
            ]
        },
        {
            region: 'center',
            layout: 'border',
            xtype: 'panel',
            title: '',
            floatable: false,
            constrain: false,
            items: [{
                region: 'center',
                layout: 'border',
                xtype: 'panel',
                title: '',
                floatable: false,
                constrain: false,
                items: [{
                    region: 'center',
                    xtype: 'mapView',
                    constrain: false,
                    collapsible: false,
                    title: ''
                }]

            }, {
                region: 'south',
                xtype: 'reportView',
                reference: 'reportView',
                height: Traccar.Style.reportHeight,
                collapsed: true,
                titleCollapse: true,
                glyph: 'xf022@FontAwesome',
                constrain: false,
                header: false,
                floatable: false,
                draggable: false,
                collapsible: true,
                split: true,
                flex: 1,
                tools: [
                ]
            }]
        }]
});
