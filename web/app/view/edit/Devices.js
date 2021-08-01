/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
/* eslint-disable require-jsdoc */
/* eslint-disable func-style */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable one-var */
/* eslint-disable complexity */
/* eslint-disable no-undef */
/* eslint-disable no-implicit-globals */
/* eslint-disable vars-on-top */
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

Ext.define('Traccar.view.edit.Devices', {
    extend: 'Traccar.view.GridPanel',
    xtype: 'devicesView',

    requires: [
        'Traccar.AttributeFormatter',
        'Traccar.view.edit.DevicesController',
        'Traccar.view.ArrayListFilter',
        'Traccar.view.DeviceMenu',
        'Traccar.view.UnescapedTextField'
    ],

    controller: 'devices',

    store: 'VisibleDevices',

    stateId: 'devices-grid',
    stateful: {
        columns: true
    },

    listeners: {
        selectionchange: 'onSelectionChange'
    },

    reserveScrollbar: true,
    bufferedRenderer: true,

    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: [
                '{columnName} - {name} - {[values.children.length]}'
            ],
            hideGroupedHeader: false
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            componentCls: 'toolbar-header-style',
            dock: 'top',
            defaults: {
                xtype: 'button',
                disabled: true,
                tooltipType: 'title'
            },
            items: [{
                xtype: 'tbtext',
                html: '<span><a href=\'./\'><img src=\'./logo/back.png\' class=\'showthat\' vertical-align: middle;\' alt=\'logo\' height=\'27px\' width=\'82px\' /></a></span><span class=\'showthatmin\'>Objects</span>',
                baseCls: 'x-panel-header-title-default'
            }, {
                xtype: 'tbfill',
                disabled: false
            }, {
                handler: 'onAddClick',
                reference: 'toolbarAddButton',
                glyph: 'xf067@FontAwesome',
                tooltip: Strings.sharedAdd
            }, {
                handler: 'onEditClick',
                reference: 'toolbarEditButton',
                glyph: 'xf040@FontAwesome',
                tooltip: Strings.sharedEdit
            }, {
                handler: 'onRemoveClick',
                reference: 'toolbarRemoveButton',
                glyph: 'xf00d@FontAwesome',
                tooltip: Strings.sharedRemove
            }, {
                handler: 'onCommandClick',
                reference: 'deviceCommandButton',
                glyph: 'xf093@FontAwesome',
                tooltip: Strings.deviceCommand
            }, {
                xtype: 'deviceMenu',
                reference: 'toolbarDeviceMenu',
                enableToggle: false
            }]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            padding: '7 0 0 0',
            margin: '0 0 0 0',
            items: [
                {
                    xtype: 'tbtext',
                    margin: '0 0 0 10',
                    itemId: 'devicesTotal',
                    text: 'Loading...'
                },
                {
                    xtype: 'tbfill',
                    maxWidth: 15
                },
                '-',
                {
                    xtype: 'unescapedTextField',
                    id: 'name',
                    flex: 1,
                    emptyText: 'Search Objects',
                    allowBlank: true,
                    listeners: {
                        change: 'searchFilter'
                    }
                },
                '-',
                {
                    xtype: 'tbfill',
                    maxWidth: 15
                },
                {
                    xtype: 'button',
                    html: '&nbsp; Export',
                    glyph: 'xf1c3@FontAwesome',
                    handler: function (b, e) {
                        var d = new Date();
                        b.up('grid').export('Object-list-' + d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + '-' + d.getHours() + '-' + d.getMinutes());
                    }
                }]
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
        var store = this.getStore();
        textItem = this.down('#devicesTotal');
        this.mon(store, 'load', function () {
            textItem.setText('Total: ' + store.getCount());
        });
    },

    viewConfig: {
        enableTextSelection: true,
        preserveScrollOnRefresh: true,

        getRowClass: function (record) {
            var result = '',
                currentTimeNumeric = Number(new Date()) / 1000,
                expirationTime = Number(new Date(String(record.get('expiration')))) / 1000;

            /*
             * Var status = record.get('status'),
             *     lastupdate = String(record.get('lastUpdate')),
             *     movement = record.get('movement'),
             *     speed = record.get('speed');
             */

            /*
             * Var deviceTimeDiff = (Number(new Date()) - Number(new Date(lastupdate))) / 1000;
             * var expTime = Number(new Date(expirationTime)) / 1000;
             * var motion = record.get('motion');
             * if (typeof record.get('ignition') !== undefined) {
             *     var ignition = record.get('ignition');
             * } else {
             *     var ignition = false;
             * }
             */

            if (record.get('disabled') || currentTimeNumeric > expirationTime) {
                result = 'view-item-disabled ';
            }

            /**
             *
             * If (status && movement) {
             * if (status === 'nulled') {
             * result += 'view-color-red';
             * } else if (deviceTimeDiff >= Traccar.Style.devicesTimeout || (movement === '' || movement === undefined) && status === '' && deviceTimeDiff >= Traccar.Style.devicesTimeout || movement === 'moving' && deviceTimeDiff >= Traccar.Style.devicesTimeout) {
             * result += 'view-color-red';
             * } else if (typeof ignition !== undefined && ignition === true && (movement === 'moving' || movement === 'parked' || movement === 'idle') && (typeof motion !== undefined && motion === false)) {
             * result += 'view-color-yellow';
             * } else if (movement === 'parked') {
             * result += 'view-color-orange';
             * } else if ((movement === '' || movement === null || movement === undefined) && (typeof motion !== undefined && motion === false) && (lastupdate !== null || lastupdate !== '')) {
             * result += 'view-color-orange';
             * } else if ((movement === 'idle' || movement === '') && (typeof ignition !== undefined && ignition === false && ignition !== null) || typeof motion !== undefined && motion === false && motion !== null && (movement === '' || movement === null)) {
             * result += 'view-color-orange';
             * } else if (movement === 'idle' && (typeof ignition !== undefined && ignition === false && ignition !== null) && (typeof motion !== undefined && motion === true && motion !== null && speed <= 7)) {
             * result += 'view-color-orange';
             * } else if (movement === 'moving' && (typeof ignition !== undefined && ignition === false && ignition !== null) && (typeof motion !== undefined && (motion === true || motion === false) && motion !== null && speed <= 3)) {
             * result += 'view-color-orange';
             * } else if (movement === 'moving' && speed > 2) {
             * result += 'view-color-green';
             * } else if (motion === true && speed > 2 && (motion === true && (movement === '' || movement === null || movement === undefined)) && (lastupdate !== null || lastupdate !== '')) {
             * result += 'view-color-green';
             * } else if (movement === 'idle') {
             * result += 'view-color-yellow';
             * } else if ((movement === '' || movement === null) && (lastupdate === null || lastupdate === '')) {
             * result += 'view-color-red';
             * } else {
             * result += 'view-color-yellow';
             * }
             *} *
             */
            return result;
        },
        listeners: {
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true) {
                        column.autoSize();
                    }
                });
            },
            itemdblclick: function (dv, record, item, index, e) {

                /*
                 * TODO: Load report details into config
                 * posId = record.get('id');
                 * console.log(posId);
                 */
            }
        }
    },

    columns: {
        defaults: {
            flex: 1,
            exportable: true,
            minWidth: 60,
            autoSizeColumn: true
        },
        items: [{
            text: Strings.sharedObjectName,
            dataIndex: 'name',
            stateId: 'devicePaneName',
            minWidth: 70,
            maxWidth: 115,
            filter: {
                type: 'string',
                labelField: 'name',
                store: 'VisibleDevices'
            },
            renderer: function (value, metaData, record) {
                var status = record.get('status');
                var lastupdate = String(record.get('lastUpdate'));
                var deviceTimeDiff = (Number(new Date()) - Number(new Date(lastupdate))) / 1000;
                if (status === 'online' || deviceTimeDiff < Traccar.Style.devicesTimeout) {
                    metaData.tdCls = 'view-color-green-text';
                } else if (status === 'offline' && record.get('lastUpdate') == null) {
                    metaData.tdCls = 'view-color-null-text';
                } else if (status === 'offline' && deviceTimeDiff >= Traccar.Style.devicesTimeout) {
                    metaData.tdCls = 'view-color-red-text';
                } else if (status === 'offline') {
                    metaData.tdCls = 'view-color-blue-text';
                } else if (status === 'unknown') {
                    metaData.tdCls = 'view-color-red-text';
                } else {
                    metaData.tdCls = 'view-color-gen-text';
                }
                return value;
            }
        }, {
            text: Strings.groupDialog,
            dataIndex: 'groupId',
            stateId: 'devicePaneGroupId',
            minWidth: 65,
            maxWidth: 115,
            hidden: true,
            filter: {
                type: 'list',
                labelField: 'name',
                store: 'Groups'
            },
            renderer: function (value, record) {
                if (value) {
                    return Traccar.AttributeFormatter.getFormatter('groupId')(value);
                } else {
                    return 'No Group';
                }
            }
        }, {
            text: Strings.deviceLastTime,
            dataIndex: 'lastUpdate',
            stateId: 'devicePaneLastUpdate',
            xtype: 'datecolumn',
            hidden: true,
            minWidth: 100,
            maxWidth: 100,
            renderer: Traccar.AttributeFormatter.getFormatter('dateTime'),
            filter: 'date'
        }, {
            text: Strings.deviceLastMovedTime,
            dataIndex: 'lastMoved',
            stateId: 'devicePaneLastMoved',
            xtype: 'datecolumn',
            hidden: true,
            minWidth: 100,
            maxWidth: 100,
            renderer: Traccar.AttributeFormatter.getFormatter('dateTime'),
            filter: 'date'
        }, {
            text: 'Status',
            stateId: 'devicePaneMovement',
            minWidth: 70,
            maxWidth: 70,
            dataIndex: 'movement',
            hidden: false,
            filter: {
                type: 'list'
            },
            renderer: function (value, metaData, record) {
                var currentTimeNumeric = Number(new Date()) / 1000, state = 'None',
                    status = record.get('status'),
                    motion = record.get('motion'),
                    ignition = record.get('ignition'),
                    alarms = record.get('alarms'),
                    speed = record.get('speed'),
                    lastupdate = String(record.get('lastUpdate')),
                    expirationTime = Number(new Date(String(record.get('expiration')))) / 1000;
                var deviceTimeDiff = (Number(new Date()) - Number(new Date(lastupdate))) / 1000;
                var typeAlarms = typeof alarms !== undefined,
                    typeIgnition = typeof ignition !== undefined,
                    typeMotion = typeof motion !== undefined;

                /** Object expiration check **/
                if (currentTimeNumeric > expirationTime) {
                    state = 'Expired';
                }

                /** Offline status check **/
                if ((status === 'offline' || status === 'unknown') &&
                    deviceTimeDiff >= Traccar.Style.devicesTimeout || status === 'nulled') {
                    state = 'Offline';
                }

                /** Alarms status check **/
                if (typeAlarms && alarms && alarms !== 'nil') {
                    state = alarms;
                }

                /** Ignition value check **/
                if (typeIgnition && (ignition || speed >= 2)) {
                    ignition = true;
                } else if (typeIgnition && (!ignition || speed < 1)) {
                    ignition = false;
                } else {
                    ignition = false;
                }

                /** Motion value check **/
                if (typeMotion && (motion || speed >= 2)) {
                    motion = true;
                } else if (typeMotion && (!motion || speed < 1)) {
                    motion = false;
                } else {
                    motion = false;
                }

                /** Movement Idle status check **/
                if (value === 'idle' && ignition || ignition && !motion) {
                    state = 'Idle';
                }

                /** Movement Parked status check **/
                if (value !== null && (value === 'parked' || !ignition && !motion)) {
                    state = 'Parked';
                }

                /** Movement Moving status check **/
                if (value === 'moving' || ignition && motion) {
                    state = 'Moving';
                }

                return state;
            }
        },

        /**
         * {
         * text: Strings.deviceStatus,
         * dataIndex: 'status',
         * stateId: 'devicePaneStatus',
         * minWidth: 60,
         * maxWidth: 60,
         * hidden: true,
         * filter: {
         * type: 'list',
         * labelField: 'name',
         * store: 'DeviceStatuses'
         * },
         * renderer: function (value, metaData, record) {
         * var statusy;
         * if (value) {
         * var status = record.get('status');
         * var lastupdate = String(record.get('lastUpdate'));
         * var deviceTimeDiff = (Number(new Date()) - Number(new Date(lastupdate))) / 1000;
         * statusy = Ext.getStore('DeviceStatuses').getById(value);
         * if (statusy) {
         * if ((status === 'offline' || status === 'unknown') && deviceTimeDiff >= Traccar.Style.devicesTimeout) {
         * return 'Offline';
         * } else if (status === 'offline' && record.get('lastUpdate') == null) {
         * return 'No Info';
         * } else {
         * return statusy.get('name');
         * }
         * }
         * }
         * return null;
         * }
         * },
         *
         */
        {
            text: Strings.positionSpeed,
            dataIndex: 'speed',
            stateId: 'devicePaneSpeed',
            renderer: Traccar.AttributeFormatter.getFormatter('speed'),
            hidden: true,
            minWidth: 60,
            maxWidth: 65,
            filter: 'number'
        }, {
            text: Strings.positionIgnition,
            dataIndex: 'status',
            stateId: 'devicePaneIgnition',
            renderer: function (value, metaData, record) {
                var speed = record.get('speed'), ignition = record.get('ignition');
                ignition = typeof ignition === undefined ? false : ignition || speed >= 2;
                if (ignition) {
                    metaData.tdCls = 'ign-color-green-text';
                    return 'On';
                }
                metaData.tdCls = 'ign-color-red-text';
                return 'Off';
            },
            hidden: true,
            minWidth: 50,
            maxWidth: 50,
            filter: 'boolean'
        }, {
            text: Strings.deviceModelMain,
            dataIndex: 'protocol',
            stateId: 'devicePaneDeviceModel',
            renderer: function (value) {
                return String(value) === null ? 'Unknown' : String(value);
            },
            hidden: true,
            minWidth: 65,
            maxWidth: 75,
            filter: 'list'
        }, {
            text: Strings.positionAddress,
            dataIndex: 'address',
            stateId: 'devicePaneAddress',
            minWidth: 165,
            renderer: function (value, metaData, record) {
                var geofenceStore = record.get('geofenceIds'), address = null;
                var geofenceFirst = geofenceStore.length > 0
                    ? Traccar.AttributeFormatter.geofenceIdFormatter(geofenceStore[0]) : null;
                if (!value) {
                    // Return Ext.fireEvent('routegeocode', record.getId())
                    address = 'Pending';
                } else {
                    address = Traccar.AttributeFormatter.getFormatter('address')(value);
                }
                return geofenceFirst !== null ? geofenceFirst + ' - ' + address : address;
            },
            hidden: false,
            filter: 'string'
        }, {
            text: Strings.deviceIdentifier,
            dataIndex: 'uniqueId',
            stateId: 'devicePaneUniqueId',
            hidden: true,
            filter: 'string'
        }, {
            text: Strings.sharedPhone,
            stateId: 'devicePanePhone',
            dataIndex: 'phone',
            hidden: true,
            filter: 'string'
        }, {
            text: Strings.deviceModel,
            dataIndex: 'model',
            stateId: 'devicePaneModel',
            hidden: true,
            filter: 'string'
        }, {
            text: Strings.deviceContact,
            dataIndex: 'contact',
            stateId: 'devicePaneContact',
            hidden: true,
            filter: 'string'
        }, {
            text: Strings.sharedDisabled,
            dataIndex: 'disabled',
            stateId: 'devicePaneDisabled',
            renderer: Traccar.AttributeFormatter.getFormatter('disabled'),
            hidden: true,
            filter: 'boolean'
        }, {
            text: Strings.userExpirationTime,
            dataIndex: 'expiration',
            stateId: 'devicePaneExpiration',
            xtype: 'datecolumn',
            hidden: true,
            minWidth: 100,
            maxWidth: 100,
            renderer: function (value, metaData, record) {
                if (value === null) {
                    return 'Unlimited';
                } else {
                    return Traccar.AttributeFormatter.getFormatter('dateTime')(value);
                }
            },
            filter: 'date'
        }, {
            text: Strings.sharedGeofences,
            dataIndex: 'geofenceIds',
            stateId: 'devicePaneGeozone',
            hidden: true,
            filter: {
                type: 'arraylist',
                idField: 'id',
                labelField: 'name',
                store: 'Geofences'
            },
            renderer: function (value) {
                var i, name, result = '';
                if (Ext.isArray(value)) {
                    for (i = 0; i < value.length; i++) {
                        name = Traccar.AttributeFormatter.geofenceIdFormatter(value[i]);
                        if (name) {
                            result += name + (i < value.length - 1 ? ', ' : '');
                        }
                    }
                }
                return result;
            }
        }]
    },

    includeHeaders: true,
    forceFit: true,
    selModel: {
        selType: 'rowmodel',
        mode: 'MULTI'
    }
});
