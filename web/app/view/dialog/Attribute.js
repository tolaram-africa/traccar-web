/*
 * Copyright 2016 - 2017 Anton Tananaev (anton@traccar.org)
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

Ext.define('Traccar.view.dialog.Attribute', {
    extend: 'Traccar.view.dialog.Base',

    requires: [
        'Traccar.view.dialog.AttributeController',
        'Traccar.view.ColorPicker',
        'Traccar.view.CustomNumberField',
        'Traccar.view.UnescapedTextField'
    ],

    controller: 'attribute',
    title: Strings.sharedAttribute,

    items: {
        xtype: 'form',
        cls: 'rounded',
        listeners: {
            validitychange: 'onValidityChange'
        },
        items: [
            {
                xtype: 'unescapedTextField',
                reference: 'nameTextField',
                name: 'name',
                allowBlank: false,
                emptyText: Strings.sharedName,
                minWidth: Traccar.Style.formFieldWidth
            },
            {
                xtype: 'fieldset',
                title: Strings.sharedRequired,
                defaults: {
                    minWidth: Traccar.Style.formFieldWidth - 35
                },
                items: [{
                    xtype: 'textfield',
                    name: 'value',
                    reference: 'valueField',
                    allowBlank: false,
                    emptyText: Strings.stateValue
                }]
            }]
    },

    buttons: [{
        glyph: 'xf00c@FontAwesome',
        reference: 'saveButton',
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
