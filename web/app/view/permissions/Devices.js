/* eslint-disable no-unused-vars */
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

Ext.define('Traccar.view.permissions.Devices', {
    extend: 'Traccar.view.permissions.Base',
    xtype: 'linkDevicesView',

    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: [
                '{columnName} - {name} - {[values.children.length]}'
            ],
            hideGroupedHeader: false
        }
    ],

    requires: [
        'Traccar.AttributeFormatter'
    ],

    columns: {
        items: [{
            text: Strings.sharedName,
            dataIndex: 'name',
            flex: 1,
            minWidth: Traccar.Style.columnWidthNormal,
            filter: 'string'
        }, {
            text: Strings.groupDialog,
            dataIndex: 'groupId',
            flex: 1,
            hidden: false,
            filter: {
                type: 'list',
                labelField: 'name',
                store: 'Groups'
            },
            renderer: Traccar.AttributeFormatter.getFormatter('groupId')
        }, {
            text: Strings.deviceIdentifier,
            dataIndex: 'uniqueId',
            flex: 1,
            minWidth: Traccar.Style.columnWidthNormal,
            filter: 'string'
        }, {
            text: Strings.sharedPhone,
            dataIndex: 'phone',
            flex: 1,
            minWidth: Traccar.Style.columnWidthNormal,
            hidden: true,
            filter: 'string'
        }, {
            text: Strings.deviceModel,
            dataIndex: 'model',
            flex: 1,
            minWidth: Traccar.Style.columnWidthNormal,
            hidden: true,
            filter: 'string'
        }, {
            text: Strings.deviceContact,
            dataIndex: 'contact',
            flex: 1,
            minWidth: Traccar.Style.columnWidthNormal,
            hidden: true,
            filter: 'string'
        }, {
            text: Strings.sharedDisabled,
            dataIndex: 'disabled',
            flex: 1,
            minWidth: Traccar.Style.columnWidthNormal,
            renderer: Traccar.AttributeFormatter.getFormatter('disabled'),
            hidden: false,
            filter: 'boolean'
        }, {
            text: Strings.userExpirationTime,
            dataIndex: 'expiration',
            xtype: 'datecolumn',
            hidden: false,
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
        }]
    }
});
