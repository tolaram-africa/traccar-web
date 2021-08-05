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
Ext.define('Traccar.view.SettingsWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settingsWindowController',

    init: function () {
        var admin = Traccar.app.getUser().get('administrator'),
            manager = Traccar.app.getUser().get('userLimit') !== 0,
            readonly = Traccar.app.getPreference('readonly', false);
        if (admin) {
            this.lookupReference('refStatisticsView').tab.show();
            if (!Traccar.app.getBooleanAttributePreference('ui.disableComputedAttributes')) {
                this.lookupReference('refComputedAttributesView').tab.show();
            }
        }
        if (admin || manager) {
            this.lookupReference('refUsersView').tab.show();
        }

        if (admin || !readonly) {
            this.lookupReference('refGroupsView').tab.show();
            this.lookupReference('refNotificationsView').tab.show();
            if (!Traccar.app.getBooleanAttributePreference('ui.disableCalendars')) {
                this.lookupReference('refCalendarsView').tab.show();
            }
            if (!Traccar.app.getVehicleFeaturesDisabled() || !Traccar.app.getBooleanAttributePreference('ui.disableDrivers')) {
                this.lookupReference('refDriversView').tab.show();
            }
            if (!Traccar.app.getPreference('limitCommands', false)) {
                this.lookupReference('refSavedCommandsView').tab.show();
            }
            if (!Traccar.app.getVehicleFeaturesDisabled() || !Traccar.app.getBooleanAttributePreference('ui.disableMaintenance')) {
                this.lookupReference('refMaintenancesView').tab.show();
            }
        }
    }
});
