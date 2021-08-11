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

Ext.define('Traccar.model.Device', {
    extend: 'Ext.data.Model',
    identifier: 'negative',

    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'uniqueId',
        type: 'string'
    }, {
        name: 'speed',
        type: 'float',
        persist: false
    }, {
        name: 'address',
        type: 'string',
        persist: false
    }, {
        name: 'protocol',
        type: 'string',
        persist: false
    }, {
        name: 'ignition',
        persist: false,
        allowNull: true,
        type: 'boolean'
    }, {
        name: 'alarms',
        persist: false,
        allowNull: true,
        type: 'string'
    }, {
        name: 'motion',
        persist: false,
        allowNull: true,
        type: 'boolean'
    }, {
        name: 'phone',
        type: 'string',
        allowNull: true
    }, {
        name: 'model',
        type: 'string',
        allowNull: true
    }, {
        name: 'contact',
        type: 'string',
        allowNull: true
    }, {
        name: 'category',
        type: 'string',
        defaultValue: 'arrow',
        allowNull: true
    }, {
        name: 'status',
        type: 'string',
        allowNull: true
    }, {
        name: 'statusAll',
        type: 'string',
        allowNull: true,
        persist: false,
        depends: ['status', 'movement', 'motion', 'lastUpdate', 'expiration', 'speed', 'ignition'],
        calculate: function (data) {
            return Traccar.AttributeFormatter.getFormatter('deviceState')(data);
        }
    }, {
        name: 'deviceProtocol',
        type: 'string',
        persist: false,
        allowNull: true,
        calculate: function (data) {
            var protocol = data.protocol.length > 1 ? data.protocol : 'pending';
            return protocol[0].toUpperCase() + protocol.substring(1);
        },
        depends: ['protocol']
    }, {
        name: 'lastMoved',
        persist: false,
        type: 'date',
        dateFormat: 'c',
        allowNull: true
    }, {
        name: 'movement',
        type: 'string',
        allowNull: true
    }, {
        name: 'expiration',
        type: 'date',
        dateFormat: 'c',
        allowNull: true
    }, {
        name: 'lastUpdate',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'groupId',
        type: 'int'
    }, {
        name: 'disabled',
        type: 'boolean'
    }, {
        name: 'geofenceIds'
    }, {
        name: 'attributes'
    }]
});
