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

Ext.define('Traccar.view.SettingsWindow', {
    extend: 'Traccar.view.BaseWindow',
    xtype: 'settingsWindow',

    requires: [
        'Traccar.view.SettingsWindowController'
    ],

    controller: 'settingsWindowController',

    title: Strings.settingsTitle,

    items: {
        xtype: 'tabpanel',
        tabPosition: 'bottom',
        bodyPadding: 0,
        padding: 0,
        tabBar: {
            minHeight: 22,
            layout: {
                pack: 'center'
            }
        },
        activeTab: 0,
        items: [{
            title: Strings.sharedNotifications,
            glyph: 'xf0f3@FontAwesome',
            xtype: 'notificationsView',
            hidden: true,
            reference: 'refNotificationsView'
        },
        {
            title: Strings.settingsGroups,
            glyph: 'xf0e8@FontAwesome',
            xtype: 'groupsView',
            hidden: true,
            reference: 'refGroupsView'
        },
        {
            title: Strings.settingsUsers,
            glyph: 'xf0c0@FontAwesome',
            xtype: 'usersView',
            hidden: true,
            reference: 'refUsersView'
        },
        {
            title: Strings.sharedComputedAttributes,
            glyph: 'xf0ae@FontAwesome',
            xtype: 'computedAttributesView',
            hidden: true,
            reference: 'refComputedAttributesView'
        },
        {
            title: Strings.statisticsTitle,
            glyph: 'xf080@FontAwesome',
            xtype: 'statisticsView',
            hidden: true,
            reference: 'refStatisticsView'
        },
        {
            title: Strings.sharedCalendars,
            glyph: 'xf073@FontAwesome',
            xtype: 'calendarsView',
            hidden: true,
            reference: 'refCalendarsView'
        },
        {
            title: Strings.sharedDrivers,
            glyph: 'xf084@FontAwesome',
            xtype: 'driversView',
            hidden: true,
            reference: 'refDriversView'
        },
        {
            title: Strings.sharedSavedCommands,
            glyph: 'xf093@FontAwesome',
            xtype: 'savedCommandsView',
            hidden: true,
            reference: 'refSavedCommandsView'
        },
        {
            title: Strings.sharedMaintenance,
            glyph: 'xf0ad@FontAwesome',
            xtype: 'maintenancesView',
            hidden: true,
            reference: 'refMaintenancesView'
        }, {
            title: 'Info',
            glyph: 'xf05a@FontAwesome',
            bodyPadding: 10,
            html: 'Content pending..'
        }]
    }
});
