/*
 * Copyright 2017 - 2018 Anton Tananaev (anton@traccar.org)
 * Copyright 2017 - 2018 Andrey Kunitsyn (andrey@traccar.org)
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

Ext.define('Traccar.view.dialog.Notification', {
    extend: 'Traccar.view.dialog.BaseEdit',

    requires: [
        'Traccar.view.ClearableComboBox',
        'Traccar.view.dialog.NotificationController',
        'Traccar.view.UnescapedTextField'
    ],

    controller: 'notification',
    title: Strings.sharedNotification,

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
            xtype: 'combobox',
            name: 'type',
            emptyText: Strings.sharedType,
            cls: 'rounded',
            store: 'AllNotificationTypes',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'type',
            editable: false,
            allowBlank: false,
            listeners: {
                change: 'onTypeChange'
            }
        }, {
            xtype: 'tagfield',
            reference: 'alarmsField',
            cls: 'rounded',
            emptyText: Strings.sharedAlarms,
            maxWidth: Traccar.Style.formFieldWidth,
            store: 'AlarmTypes',
            valueField: 'key',
            displayField: 'name',
            queryMode: 'local',
            hidden: true,
            listeners: {
                beforerender: 'onAlarmsLoad',
                change: 'onAlarmsChange'
            }
        }, {
            xtype: 'tagfield',
            emptyText: Strings.notificationNotificators,
            name: 'notificators',
            cls: 'rounded',
            maxWidth: Traccar.Style.formFieldWidth,
            store: 'AllNotificators',
            valueField: 'type',
            displayField: 'name',
            queryMode: 'local'
        }, {
            xtype: 'checkboxfield',
            inputValue: true,
            uncheckedValue: false,
            name: 'always',
            minWidth: 10,
            boxLabel: Strings.notificationAlways + ' linked Objects'
        }, {
            xtype: 'fieldset',
            title: Strings.sharedExtra,
            collapsible: true,
            collapsed: false,
            defaults: {
                minWidth: Traccar.Style.formFieldWidth - 35
            },
            items: [{
                xtype: 'clearableComboBox',
                reference: 'calendarCombo',
                name: 'calendarId',
                store: 'Calendars',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                emptyText: Strings.sharedCalendar
            }]
        }]
    }
});
