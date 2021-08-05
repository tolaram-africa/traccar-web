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

Ext.define('Traccar.view.dialog.Device', {
    extend: 'Traccar.view.dialog.BaseEdit',

    requires: [
        'Traccar.view.ClearableComboBox',
        'Traccar.view.dialog.DeviceController',
        'Traccar.view.UnescapedTextField'
    ],

    controller: 'device',
    title: Strings.sharedDevice,

    items: {
        xtype: 'form',
        defaults: {
            minWidth: Traccar.Style.formFieldWidth
        },
        items: [{
            xtype: 'unescapedTextField',
            name: 'name',
            emptyText: Strings.sharedName,
            allowBlank: false
        }, {
            xtype: 'unescapedTextField',
            name: 'uniqueId',
            emptyText: Strings.deviceIdentifier,
            allowBlank: false
        }, {
            xtype: 'combobox',
            name: 'groupId',
            cls: 'rounded',
            emptyText: Strings.groupDialog,
            store: 'Groups',
            forceSelection: true,
            allowBlank: false,
            editable: false,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                afterrender: function (combo) {
                    var store = combo.getStore();
                    if (!combo.getValue() && store.getCount() > 0) {
                        combo.setValue(store.getAt(0).get(combo.valueField));
                    }
                }
            }
        }, {
            xtype: 'unescapedTextField',
            name: 'phone',
            emptyText: Strings.sharedPhone
        }, {
            xtype: 'fieldset',
            title: Strings.sharedExtra,
            collapsible: true,
            collapsed: true,
            defaults: {
                minWidth: Traccar.Style.formFieldWidth - 35
            },
            items: [{
                xtype: 'unescapedTextField',
                name: 'model',
                emptyText: Strings.deviceModel
            }, {
                xtype: 'unescapedTextField',
                name: 'contact',
                emptyText: Strings.deviceContact
            }, {
                xtype: 'combobox',
                name: 'category',
                cls: 'rounded',
                emptyText: Strings.deviceCategory,
                store: 'DeviceImages',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'key',
                editable: false,
                listConfig: {
                    getInnerTpl: function () {
                        return '<table><tr valign="middle" ><td><div align="center" style="width:40px;height:40px;" >' +
                            '{[new XMLSerializer().serializeToString(Traccar.DeviceImages.getImageSvg(' +
                            'Traccar.Style.ColorOnline, false, 0, values.key))]}</div></td>' +
                            '<td>{name}</td></tr></table>';
                    }
                }
            }, {
                xtype: 'datefield',
                name: 'expiration',
                emptyText: Strings.userExpirationTime,
                cls: 'rounded',
                disabled: true,
                reference: 'expirationField',
                startDay: Traccar.Style.weekStartDay,
                format: Traccar.Style.dateFormat
            }, {
                xtype: 'checkboxfield',
                inputValue: true,
                uncheckedValue: false,
                name: 'disabled',
                boxLabel: Strings.sharedDisabled,
                minWidth: 10,
                hidden: true,
                reference: 'disabledField'
            }]
        }]
    }
});
