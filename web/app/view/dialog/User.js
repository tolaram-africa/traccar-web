/*
 * Copyright 2015 - 2018 Anton Tananaev (anton@traccar.org)
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

Ext.define('Traccar.view.dialog.User', {
    extend: 'Traccar.view.dialog.BaseEdit',

    requires: [
        'Traccar.view.ClearableComboBox',
        'Traccar.view.dialog.UserController',
        'Traccar.view.UnescapedTextField'
    ],

    controller: 'user',
    title: Strings.settingsUser,
    defaults: {
        minWidth: Traccar.Style.formFieldWidth
    },
    items: {
        xtype: 'form',
        items: [{
            xtype: 'unescapedTextField',
            name: 'name',
            emptyText: Strings.sharedName
        }, {
            xtype: 'unescapedTextField',
            name: 'email',
            emptyText: Strings.userEmail,
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
            emptyText: Strings.userPassword,
            cls: 'rounded',
            minWidth: Traccar.Style.formFieldWidth,
            inputType: 'password',
            allowBlank: false
        }, {
            xtype: 'fieldset',
            title: Strings.sharedPreferences,
            collapsible: true,
            collapsed: true,
            defaults: {
                minWidth: Traccar.Style.formFieldWidth - 35
            },
            items: [{
                xtype: 'unescapedTextField',
                name: 'phone',
                emptyText: Strings.sharedPhone
            }, {
                xtype: 'clearableComboBox',
                name: 'map',
                emptyText: Strings.mapLayer,
                store: 'MapTypes',
                displayField: 'name',
                valueField: 'key'
            }, {
                xtype: 'numberfield',
                reference: 'latitude',
                cls: 'rounded',
                name: 'latitude',
                emptyText: Strings.positionLatitude,
                decimalPrecision: Traccar.Style.coordinatePrecision
            }, {
                xtype: 'numberfield',
                reference: 'longitude',
                cls: 'rounded',
                name: 'longitude',
                emptyText: Strings.positionLongitude,
                decimalPrecision: Traccar.Style.coordinatePrecision
            }, {
                xtype: 'numberfield',
                reference: 'zoom',
                cls: 'rounded',
                name: 'zoom',
                emptyText: Strings.serverZoom
            }, {
                xtype: 'clearableComboBox',
                name: 'coordinateFormat',
                emptyText: Strings.settingsCoordinateFormat,
                store: 'CoordinateFormats',
                displayField: 'name',
                valueField: 'key'
            }, {
                xtype: 'unescapedTextField',
                name: 'poiLayer',
                emptyText: Strings.mapPoiLayer
            }, {
                xtype: 'checkboxfield',
                inputValue: true,
                uncheckedValue: false,
                name: 'twelveHourFormat',
                boxLabel: Strings.settingsTwelveHourFormat,
                minWidth: 10
            }]
        }, {
            xtype: 'fieldset',
            reference: 'permissionFieldset',
            title: Strings.sharedPermissions,
            collapsible: true,
            collapsed: true,
            hidden: true,
            defaults: {
                minWidth: Traccar.Style.formFieldWidth - 35
            },
            items: [{
                xtype: 'datefield',
                name: 'expirationTime',
                emptyText: Strings.userExpirationTime,
                cls: 'rounded',
                disabled: true,
                reference: 'expirationTimeField',
                startDay: Traccar.Style.weekStartDay,
                format: Traccar.Style.dateFormat
            }, {
                xtype: 'numberfield',
                cls: 'rounded',
                name: 'deviceLimit',
                emptyText: Strings.userDeviceLimit,
                disabled: true,
                reference: 'deviceLimitField'
            }, {
                xtype: 'numberfield',
                name: 'userLimit',
                emptyText: Strings.userUserLimit,
                cls: 'rounded',
                disabled: true,
                reference: 'userLimitField'
            }, {
                xtype: 'unescapedTextField',
                name: 'token',
                reference: 'tokenField',
                emptyText: Strings.userToken,
                triggers: {
                    generate: {
                        cls: 'iconCls: x-fa fa-refresh',
                        handler: 'generateToken'
                    }
                }
            }, {
                xtype: 'checkboxgroup',
                columns: 2,
                vertical: true,
                items: [
                    {
                        xtype: 'checkboxfield',
                        inputValue: true,
                        uncheckedValue: false,
                        name: 'disabled',
                        boxLabel: Strings.sharedDisabled,
                        disabled: true,
                        reference: 'disabledField'
                    }, {
                        xtype: 'checkboxfield',
                        inputValue: true,
                        uncheckedValue: false,
                        name: 'administrator',
                        boxLabel: Strings.userAdmin,
                        disabled: true,
                        hidden: true,
                        reference: 'adminField'
                    }, {
                        xtype: 'checkboxfield',
                        inputValue: true,
                        uncheckedValue: false,
                        name: 'readonly',
                        boxLabel: Strings.serverReadonly,
                        disabled: true,
                        reference: 'readonlyField'
                    }, {
                        xtype: 'checkboxfield',
                        inputValue: true,
                        uncheckedValue: false,
                        name: 'deviceReadonly',
                        boxLabel: Strings.userDeviceReadonly,
                        disabled: true,
                        reference: 'deviceReadonlyField'
                    }, {
                        xtype: 'checkboxfield',
                        inputValue: true,
                        uncheckedValue: false,
                        name: 'limitCommands',
                        boxLabel: Strings.userLimitCommands,
                        disabled: true,
                        reference: 'limitCommandsField'
                    }
                ]
            }]
        }]
    },

    buttons: [{
        text: Strings.sharedAttributes,
        handler: 'showAttributesView'
    }, {
        glyph: 'xf041@FontAwesome',
        minWidth: 0,
        handler: 'getMapState',
        tooltip: Strings.sharedGetMapState,
        tooltipType: 'title'
    }, {
        glyph: 'xf0f3@FontAwesome',
        minWidth: 0,
        handler: 'testNotification',
        hidden: true,
        reference: 'testNotificationButton',
        tooltip: Strings.sharedTestNotification,
        tooltipType: 'title'
    }, {
        xtype: 'tbfill'
    }, {
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
