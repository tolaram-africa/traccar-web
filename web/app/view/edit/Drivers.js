/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
/* eslint-disable vars-on-top */
/* eslint-disable one-var */
/* eslint-disable require-jsdoc */
/* eslint-disable func-style */
/* eslint-disable no-unused-vars */
/*
 * Copyright 2017 Anton Tananaev (anton@traccar.org)
 * Copyright 2017 Andrey Kunitsyn (andrey@traccar.org)
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

Ext.define('Traccar.view.edit.Drivers', {
    extend: 'Traccar.view.GridPanel',
    xtype: 'driversView',

    requires: [
        'Traccar.view.edit.DriversController',
        'Traccar.AttributeFormatter',
        'Traccar.view.edit.Toolbar'
    ],

    controller: 'drivers',
    store: 'Drivers',

    tbar: {
        xtype: 'editToolbar'
    },

    listeners: {
        selectionchange: 'onSelectionChange'
    },

    columns: {
        defaults: {
            flex: 1,
            minWidth: Traccar.Style.columnWidthNormal
        },
        items: [{
            text: Strings.sharedName,
            dataIndex: 'name',
            filter: 'string'
        }, {
            text: Strings.sharedDriverId,
            dataIndex: 'uniqueId',
            filter: 'string'
        }, {
            text: Strings.sharedDriverPhone,
            dataIndex: 'driverPhone',
            filter: 'string'
        }, {
            text: Strings.sharedDriverEmail,
            dataIndex: 'driverEmail',
            filter: 'string'
        }, {
            text: Strings.sharedDriverDate,
            dataIndex: 'employment',
            xtype: 'datecolumn',
            hidden: false,
            minWidth: 100,
            maxWidth: 100,
            renderer: Traccar.AttributeFormatter.getFormatter('dateTime'),
            filter: 'date'
        }, {
            text: Strings.sharedDriverEmployed,
            dataIndex: 'disabled',
            renderer: Traccar.AttributeFormatter.getFormatter('disabled'),
            hidden: false,
            filter: 'boolean'
        }]
    }
});
