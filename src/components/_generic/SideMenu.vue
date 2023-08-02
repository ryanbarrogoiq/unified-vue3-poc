<template>
    <v-navigation-drawer v-model="drawer" permanent width="215">
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/86.jpg" title="Ryan Barrogo" nav>
            <template v-slot:append>
                <v-btn variant="text" icon="mdi-chevron-left" @click.stop="toggleDrawer"></v-btn>
            </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>

        <!-- <div
            v-for="menuItem in menuItems"
            :key="menuItem.id"
            class="mb-2"
        >
            <div class="p-0" role="tab">
                <a
                    v-b-toggle="[menuItem.groupId]"
                    class="side-menu-item-btn btn btn-block"
                    :id="menuItem.id"
                    @click="menuItem.clickFn ? menuItem.clickFn() : null"
                >
                    <div class="menu-item-icon">
                        <i class="far adjust" :class="[menuItem.icon.faIcon, menuItem.icon.classList]"></i>
                    </div>
                    <div class="menu-item-text">
                        {{ menuItem.text }}
                    </div>
                </a>
            </div>

            <b-collapse
                v-if="menuItem.subMenu.length"
                :id="menuItem.groupId"
                :visible="isParentActive(menuItem)"
                accordion="my-accordion"
                role="tabpanel"
                class="sub-menu-items"
            >
                <ul class="nav nav-sm flex-column">
                    <li
                        v-for="(subItem, smKey) in menuItem.subMenu"
                        :key="smKey"
                        class="nav-item"
                        :class="subItem.classList"
                    >
                        <a :id="subItem.id"
                           :href="subItem.url"
                           class="nav-link"
                           :class="{'active': isSubItemActive(subItem.activators)}"
                        >
                            {{ subItem.text }}
                        </a>
                    </li>
                </ul>
            </b-collapse>
        </div> -->
    </v-navigation-drawer>
</template>

<script>
import {FormsDashboard, MainMenu, MainMenuTabMainGroupMain} from "@/constants";
import {useSideMenuStore} from "@/stores";
import {toRefs} from 'vue';

export default {
    setup() {
        const sideMenuStore = useSideMenuStore();
        const {drawer, toggleDrawer} = toRefs(sideMenuStore);

        return {
            drawer,
            toggleDrawer
        };
    },
    name: "SideMenu",
    props: {
        supportSession: {
            type: Boolean,
            default: false,
        },
        excludedFormFields: {
            type: [Array, Object],
            default: () => [],
        },
        timeCardUsers: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            sideMenuRendered: false,
            permissionCheckIntervalId: null,
            menuItems: [
                {
                    id: 'home-nav',
                    text: 'Dashboard',
                    groupId: 'menu-item-home-sub-menu',
                    classList: null,
                    permissions: [MainMenu.GROUP_MAIN_BUTTON_DASHBOARD],
                    icon: {
                        faIcon: 'fa-house',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'Home Page',
                            id: 'home-page-nav',
                            url: '/',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Actions',
                            id: 'home-actions-nav',
                            url: '/actions/dashboard',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/actions/dashboard'],
                                regex: [],
                            },
                            permissions: [FormsDashboard.DASHBOARD_ENABLED],
                        },
                        {
                            text: 'Live Status',
                            id: 'home-live-status-nav',
                            url: '/live-status',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/live-status'],
                                regex: [],
                            },
                            permissions: [],
                        },
                    ],
                },
                {
                    id: 'referrals-nav',
                    text: 'Referrals',
                    groupId: 'menu-item-referrals-sub-menu',
                    classList: null,
                    permissions: [MainMenu.CAN_VIEW_CLIENTS_TAB],
                    icon: {
                        faIcon: 'fa-user-check',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'Referrals',
                            id: 'referrals-client-search-nav',
                            url: '/client/referrals',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/client/referrals'],
                                regex: [],
                            },
                            permissions: [MainMenu.GROUP_SERVICE_USER_BUTTON_SEARCH],
                        },
                    ]
                },
                {
                    id: 'clients-nav',
                    text: 'Service User',
                    groupId: 'menu-item-client-sub-menu',
                    classList: null,
                    permissions: [MainMenu.CAN_VIEW_CLIENTS_TAB],
                    icon: {
                        faIcon: 'fa-user',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'New',
                            id: 'clients-new-nav',
                            url: '/client/create',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/client/create'],
                                regex: [],
                            },
                            permissions: [MainMenu.GROUP_SERVICE_USER_BUTTON_NEW],
                        },
                        {
                            text: 'Search',
                            id: 'clients-search-nav',
                            url: '/client',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/client'],
                                regex: [
                                    /^\/client\/\d+.*$/,
                                    /^\/client-care-plan\/.*$/,
                                    /^\/client-professionals\/.*$/,
                                    /^\/client-contacts\/.*$/,
                                    /^\/contact-log#\/edit\/(\d+)\?referrer=client-(\w+)-(\d+)$/,
                                    /^\/contact-log#\/create-with-default\?referrer=client-(\w+)-(\d+)$/,
                                ],
                            },
                            permissions: [MainMenu.GROUP_SERVICE_USER_BUTTON_SEARCH],
                        },
                    ]
                },
                {
                    id: 'carers-nav',
                    text: 'Care Support Worker',
                    groupId: 'menu-item-carer-sub-menu',
                    classList: null,
                    permissions: [MainMenu.CAN_VIEW_CARERS_TAB],
                    icon: {
                        faIcon: 'fa-user-nurse',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'New',
                            id: 'carers-new-nav',
                            url: '/employee/create',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/employee/create'],
                                regex: [],
                            },
                            permissions: [MainMenu.GROUP_CARER_BUTTON_NEW],
                        },
                        {
                            text: 'Search',
                            id: 'carers-search-nav',
                            url: '/employee',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/employee'],
                                regex: [
                                    /^\/employee\/(\d+)#.*$/,
                                    /^\/employee\/(\d+)\/edit#?.*$/,
                                    /^\/holiday\/.*$/,
                                    /^\/sickness\/.*$/,
                                    /^\/carer-jobs\/.*$/,
                                    /^\/employee-availability\/.*$/,
                                    /^\/contact-log#\/edit\/(\d+)\?referrer=employee-(\w+)-(\d+)$/,
                                    /^\/contact-log#\/create-with-default\?referrer=employee-(\w+)-(\d+)$/,
                                ],
                            },
                            permissions: [MainMenu.GROUP_CARER_BUTTON_SEARCH],
                        },
                    ]
                },
                {
                    id: 'visits-nav',
                    text: 'Visits',
                    groupId: 'menu-item-visits-sub-menu',
                    classList: null,
                    permissions: [],
                    icon: {
                        faIcon: 'fa-calendar-week',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'Daily Overview',
                            id: 'visits-daily-overview-nav',
                            url: '/daily-overview',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/daily-overview'],
                                regex: [],
                            },
                            permissions: [MainMenu.DAILY_OVERVIEW],
                        },
                        {
                            text: 'Jobs',
                            id: 'visits-jobs-nav',
                            url: '/jobs',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/jobs'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Group Activities',
                            id: 'visits-group-activities-nav',
                            url: '/group-activities',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/group-activities'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Visit Publishing',
                            id: 'visits-publishing-nav',
                            url: '/visit-publishing',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/visit-publishing#/'],
                                regex: [],
                            },
                            permissions: [MainMenu.BUTTON_PUBLISHING_TIMESHEETS],
                        },
                        {
                            text: 'Problem Visits',
                            id: 'visits-problem-nav',
                            url: '/problem-visits',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/problem-visits'],
                                regex: [],
                            },
                            permissions: [MainMenu.BUTTON_PROBLEM_VISITS],
                        },
                        {
                            text: 'Tasks',
                            id: 'visits-tasks-nav',
                            url: '/task',
                            classList: null,
                            excludedFormFieldName: 'nav-bar-task',
                            activators: {
                                url: ['/task'],
                                regex: [],
                            },
                            permissions: [MainMenu.CAN_VIEW_TASKS],
                        },
                    ]
                },
                {
                    id: 'rounds-nav',
                    text: 'Rounds',
                    groupId: 'menu-item-rounds-sub-menu',
                    classList: null,
                    permissions: [MainMenu.CAN_VIEW_RUNS_TAB],
                    icon: {
                        faIcon: 'fa-car-building',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'New',
                            id: 'rounds-new-nav',
                            url: '/rounds/create#CreateRun',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/rounds/create#CreateRun'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Search',
                            id: 'rounds-search-nav',
                            url: '/rounds#Search',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/rounds#Search'],
                                regex: [
                                    /^\/rounds\/(\d+).*$/,
                                ],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Generate',
                            id: 'rounds-generate-nav',
                            url: '/rounds/generate#Generate',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/rounds/generate#Generate'],
                                regex: [],
                            },
                            permissions: [],
                        },
                    ]
                },
                {
                    id: 'communications-nav',
                    text: 'Communications',
                    groupId: 'menu-item-communications-sub-menu',
                    classList: null,
                    permissions: [],
                    icon: {
                        faIcon: 'fa-inbox-in',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'New Contact Log',
                            id: 'communications-new-contact-log-nav',
                            url: '/contact-log/create',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/contact-log#/create'],
                                regex: [],
                            },
                            permissions: [MainMenuTabMainGroupMain.CAN_ADD_NEW_CONTACT_LOG],
                        },
                        {
                            text: 'Search Contact Logs',
                            id: 'communications-contact-log-search-nav',
                            url: '/contact-log',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/contact-log#/'],
                                regex: [/^\/contact-log#\/edit\/\d+.*$/],
                            },
                            permissions: [MainMenuTabMainGroupMain.CAN_SEARCH_CONTACT_LOG],
                        },
                        {
                            text: 'Call Log',
                            id: 'communications-call-log-search-nav',
                            url: '/carer-call-log',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/carer-call-log'],
                                regex: [],
                            },
                            permissions: [],
                        },
                    ]
                },
                {
                    id: 'finance-nav',
                    text: 'Finance',
                    groupId: 'menu-item-finance-sub-menu',
                    classList: null,
                    permissions: [],
                    icon: {
                        faIcon: 'fa-sterling-sign',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'Payroll',
                            id: 'finance-payroll-nav',
                            url: '/payroll',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/payroll'],
                                regex: [],
                            },
                            permissions: [MainMenu.GROUP_PAY_BUTTON_PAYROLL_EXPORT],
                        },
                        {
                            text: 'Payroll Exports',
                            id: 'finance-payroll-exports-nav',
                            url: '/payroll/previous-exports',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/payroll/previous-exports'],
                                regex: [],
                            },
                            permissions: [MainMenu.GROUP_PAY_BUTTON_PAYROLL_EXPORT],
                        },
                        {
                            text: 'Funder Maintenance',
                            id: 'finance-funder-maintenance-nav',
                            url: '/funder',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/funder'],
                                regex: [/^\/funder.*$/],
                            },
                            permissions: [MainMenu.GROUP_FUNDERS_BUTTON_FUNDER_MAINTENANCE],
                        },
                    ]
                },
                {
                    id: 'invoicing-nav',
                    text: 'Invoicing',
                    groupId: 'menu-item-invoicing-sub-menu',
                    classList: null,
                    menuConfiguration: 'invoicing._self.enabled.side',
                    permissions: [MainMenu.TAB_INVOICING.GROUP_GENERATE_INVOICES_BUTTON_CLIENT],
                    icon: {
                        faIcon: 'fa-receipt',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'New',
                            id: 'invoicing-new-nav',
                            url: '/invoicing/create',
                            classList: null,
                            excludedFormFieldName: null,
                            menuConfiguration: 'invoicing.new.enabled.side',
                            activators: {
                                url: ['/invoicing/create'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Search',
                            id: 'invoicing-search-nav',
                            url: '/invoicing',
                            classList: null,
                            excludedFormFieldName: null,
                            menuConfiguration: 'invoicing.search.enabled.side',
                            activators: {
                                url: ['/invoicing'],
                                regex: [/^\/invoicing\/(\d+).*$/],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Generate',
                            id: 'invoice-generate-nav',
                            url: '/invoicing/generate',
                            classList: null,
                            excludedFormFieldName: null,
                            menuConfiguration: 'invoicing.generate.enabled.side',
                            activators: {
                                url: ['/invoicing/generate'],
                                regex: [],
                            },
                            permissions: [],
                        },
                    ]
                },
                {
                    id: 'timesheet-nav',
                    text: 'Timesheet Management',
                    groupId: 'menu-item-timesheet-management-sub-menu',
                    classList: null,
                    menuConfiguration: 'timesheetMgmt._self.enabled.side',
                    permissions: [MainMenu.TIMESHEET_MANAGEMENT],
                    icon: {
                        faIcon: 'fa-receipt',
                        classList: 'timesheet-management-icon-custom-style',
                    },
                    subMenu: [
                        {
                            text: 'Timesheet Processing',
                            id: 'timesheet-processing-nav',
                            url: '/timesheet-mgmt/processing',
                            classList: null,
                            excludedFormFieldName: null,
                            menuConfiguration: 'timesheetMgmt.timesheet_processing.enabled.side',
                            activators: {
                                url: ['/timesheet-mgmt/processing#/'],
                                regex: [/^\/timesheet-mgmt\/.*$/],
                            },
                            permissions: [],
                        },
                    ]
                },
            ],
        }
    },

    methods: {
        isParentActive(menuItem) {
            for (const subMenu of menuItem.subMenu) {
                if (this.isSubItemActive(subMenu.activators)) {
                    return true;
                }
            }

            return false;
        },
        isSubItemActive(activators) {
            let urls = activators?.url ?? [];
            let regexes = activators?.regex ?? [];

            if (regexes.length) {
                for (const regex of regexes) {
                    if (regex.test(window.location.pathname + window.location.hash)) {
                        return true;
                    }
                }
            }

            if (urls.length) {
                for (const url of urls) {
                    if (window.location.pathname + window.location.hash === url) {
                        return true;
                    }
                }
            }

            return false;
        },
    }
}
</script>
