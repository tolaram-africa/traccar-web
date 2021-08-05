/*
 * Copyright 2015 Anton Tananaev (anton@traccar.org)
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

Ext.define('Traccar.view.State', {
    extend: 'Traccar.view.GridPanel',
    xtype: 'stateView',
    maxHeight: Traccar.Style.eventHeight,

    requires: [
        'Traccar.view.StateController'
    ],

    viewConfig: {
        columnLines: true,
        stripeRows: false,
        getRowClass: function (record) {
            var ignition = false, styleClass;
            if (record.get('attribute') === 'ignition') {
                ignition = record.get('value') === 'Yes';
                styleClass = ignition ? 'view-color-green' : 'view-color-orange';
            } else if (record.get('attribute') === 'alarm') {
                styleClass = 'view-color-red';
            }

            return styleClass;
        }
    },

    controller: 'state',
    store: 'Attributes',
    stateful: true,
    stateId: 'stateGrid',

    tbar: {
        componentCls: 'toolbar-header-style',
        items: [{
            xtype: 'tbtext',
            html: Strings.stateTitle,
            baseCls: 'x-panel-header-title-default',
            hidden: true
        }, {
            xtype: 'tbfill',
            hidden: true
        }, {
            xtype: 'button',
            disabled: true,
            handler: 'onComputedAttributesClick',
            reference: 'computedAttributesButton',
            glyph: 'xf0ae@FontAwesome',
            tooltip: Strings.sharedComputedAttributes,
            tooltipType: 'title',
            hidden: true
        }]
    },

    columns: {
        defaults: {
            minWidth: Traccar.Style.columnWidthNormal,
            sortable: false,
            flex: 1,
            menuDisabled: true
        },
        items: [{
            text: '',
            dataIndex: 'name',
            minWidth: 40,
            maxWidth: Traccar.Style.columnWidthNormal - 20
        }, {
            text: '',
            dataIndex: 'value',
            cellWrap: true,
            renderer: function (value, metaData, record) {
                var position, device;
                position = this.getController().position;
                device = Ext.getStore('Devices').getById(position.get('deviceId'));
                if (record.get('name') === Strings.positionAddress && !value) {
                    return String(String(Ext.fireEvent('stategeocode')));
                } else if (record.get('name') === Strings.positionImage || record.get('name') === Strings.positionAudio) {
                    if (position) {
                        if (device) {
                            return '<a target="_blank" href="/api/media/' + device.get('uniqueId') + '/' + value + '" >' +
                                'Media: ' + value + '</a>';
                        }
                    }
                }
                return value;
            }
        }]
    }
});
