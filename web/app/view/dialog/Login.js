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

Ext.define('Traccar.view.dialog.Login', {
    extend: 'Traccar.view.dialog.Base',
    alias: 'widget.login',

    requires: [
        'Traccar.view.dialog.LoginController'
    ],

    controller: 'login',

    header: false,
    closable: false,
    items: {
        xtype: 'form',
        reference: 'form',

        autoEl: {
            tag: 'form',
            method: 'POST',
            action: 'fake-login.html',
            target: 'submitTarget'
        },
        defaults: {
            minWidth: Traccar.Style.formFieldWidth
        },

        items: [{
            xtype: 'image',
            src: './logo/front.png',
            alt: Strings.loginLogo,
            minWidth: Traccar.Style.logoWidth,
            height: Traccar.Style.logoHeight,
            style: {
                display: 'block',
                margin: '5px auto 0px'
            }
        }, {
            height: 30
        }, {
            xtype: 'textfield',
            name: 'email',
            reference: 'userField',
            emptyText: Strings.userEmail,

            /* FieldLabel: Strings.userEmail,*/
            allowBlank: false,
            cls: 'rounded',
            enableKeyEvents: true,
            listeners: {
                specialKey: 'onSpecialKey',
                afterrender: 'onAfterRender'
            },
            inputAttrTpl: ['autocomplete="on" autocapitalize="none"']
        }, {
            height: 3
        }, {
            xtype: 'textfield',
            name: 'password',
            reference: 'passwordField',
            emptyText: Strings.userPassword,

            /* FieldLabel: Strings.userPassword,*/
            inputType: 'password',
            allowBlank: false,
            cls: 'rounded',
            enableKeyEvents: true,
            listeners: {
                specialKey: 'onSpecialKey'
            },
            inputAttrTpl: ['autocomplete="on"']
        }, {
            height: 3
        },

        /**
         *{
         * xtype: 'combobox',
         * name: 'language',
         * FieldLabel: Strings.loginLanguage,
         * store: 'Languages',
         * displayField: 'name',
         * valueField: 'code',
         * editable: false,
         * submitValue: false,
         * listeners: {
         * select: 'onSelectLanguage'
         * },
         * reference: 'languageField'
         *},
         */
        {
            xtype: 'checkboxfield',
            inputValue: true,
            uncheckedValue: false,
            reference: 'rememberField',
            labelAlign: 'left',
            checked: true,
            boxLabel: Strings.userRemember,
            minWidth: 10
        }, {
            xtype: 'component',
            html: '<iframe id="submitTarget" name="submitTarget" style="display:none"></iframe>'
        }, {
            xtype: 'component',
            html: '<input type="submit" id="submitButton" style="display:none">'
        }
        ]
    },

    buttons: [{
        align: 'left',
        text: Strings.loginReset,
        dock: 'left',
        cls: 'forget-password-link',
        style: {
            marginRight: '95px'
        },
        handler: 'onResetClick',
        reference: 'resetButton'
    },

    /**
     * {{
     * xtype: 'button',
     * text: Strings.loginRegister,
     * handler: 'onRegisterClick',
     * reference: 'registerButton'
     * }, *
     */
    {
        dock: 'right',
        text: Strings.loginLogin,
        handler: 'onLoginClick'
    }
    ]


});
