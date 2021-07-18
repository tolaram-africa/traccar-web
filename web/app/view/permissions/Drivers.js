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

Ext.define('Traccar.view.permissions.Drivers', {
    extend: 'Traccar.view.permissions.Base',
    requires: [
        'Traccar.AttributeFormatter'
    ],
    xtype: 'linkDriversView',

    columns: {
        items: [{
            text: Strings.sharedName,
            dataIndex: 'name',
            flex: 1,
            minWidth: Traccar.Style.columnWidthNormal,
            filter: 'string'
        }, {
            text: Strings.sharedDriverId,
            dataIndex: 'uniqueId',
            flex: 1,
            minWidth: Traccar.Style.columnWidthNormal,
            filter: 'string'
        }, {
            text: Strings.sharedDriverPhone,
            dataIndex: 'driverPhone',
            flex: 1,
            minWidth: Traccar.Style.columnWidthNormal,
            filter: 'string'
        }, {
            text: Strings.sharedDriverEmail,
            dataIndex: 'driverEmail',
            flex: 1,
            minWidth: Traccar.Style.columnWidthNormal,
            filter: 'string'
        }, {
            text: Strings.sharedDriverDate,
            dataIndex: 'employment',
            xtype: 'datecolumn',
            hidden: false,
            minWidth: 100,
            maxWidth: 100,
            renderer: function (value, metaData, record) {
                // eslint-disable-next-line require-jsdoc
                function formatDate (date) {
                    var year = date.getFullYear().toString().substr(-2),
                        month = date.getMonth() + 1,
                        day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
                        hour = date.getHours(),
                        minute = date.getMinutes(),
                        hourFormatted = hour < 10 ? '0' + hour : hour,
                        minuteFormatted = minute < 10 ? '0' + minute : minute;
                    return day + '-' + month + '-' + year + ' ' + hourFormatted + ':' + minuteFormatted;
                }

                if (value === null) {
                    return 'Unlimited';
                } else {
                    return formatDate(new Date(String(value)));
                }
            },
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
