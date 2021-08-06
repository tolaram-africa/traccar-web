/*
 * Copyright 2019 Anton Tananaev (anton@traccar.org)
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
Ext.define('Traccar.view.UnescapedTextField', {
    extend: 'Ext.form.field.Text',
    xtype: 'unescapedTextField',

    initComponent: function () {
        this.callParent();
        this.on('change', this.onValueChange);
    },

    onValueChange: function (field, newValue) {
        field.setValue(Ext.String.htmlDecode(newValue));
    },
    maxLength: 255,
    minWidth: Traccar.Style.formFieldWidth,
    allowBlank: false,
    cls: 'rounded',
    inputAttrTpl: ['autocomplete="chrome-off" autocapitalize="none" autofill="off"'],
    anchor: '-15',
    regex: /[a-zA-Z0-9]+/
});
