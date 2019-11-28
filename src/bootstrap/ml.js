import Vue from 'vue'
import {MLInstaller, MLCreate, MLanguage} from 'vue-multilanguage'

Vue.use(MLInstaller);

export default new MLCreate({
    initial: 'ar',
    // development  , production
    save: process.env.NODE_ENV === 'development',
    languages: [
        new MLanguage('en').create({
            ar: 'Arabic language',
            en: 'Arabic language',
            notification: 'Notification',
            settings: 'Settings',
            search: 'Search',
            add: 'Add',
            edit: 'Edit',
            dashboard: 'dashboard',
            welcome: 'welcome',
            admin: 'welcome',
        }),

        new MLanguage('ar').create({
            ar: 'اللغة الانجليزية',
            en: 'اللغة الانجليزية',
            notification: 'الاشعارات',
            settings: 'الاعدادات',
            search: 'البحث',
            add: 'اضافة',
            edit: 'تعديل',
            dashboard: 'لوحة التحكم',
            welcome: 'مرحبا',
            admin: 'المدير المسئول',
            delegate: 'المندوبين',
            managers: 'المشرفين',
            clients: 'العملاء',
            logout: 'تسجيل الخروج',
            email: 'البريد الالكتروني',
            firstname: 'الاسم الاول',
            lastname: 'الاسم الاخير',
            type: 'النوع',
            operations: 'عمليات',
            login: 'تسجيل الدخول',
            sign_in: 'دخول',
            password: 'كلمة المرور',
            yes: 'نعم',
            no: 'ﻻ',
            confirm_warning: 'تنبيه',
            are_you_sure: 'هل انت متأكد ؟',
            // delegate:'',
            // delegate:'',
            // delegate:'',
        })
    ]
})
