export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-client', link: '/system/user-client'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
            },


        ]
    },
    { //quản lý khóa học
        name: 'menu.admin.course',
        menus: [
            {
                name: 'menu.admin.manage-course', link: '/system/course-redux'
            },
            {
                name: 'menu.admin.manage-detail-course', link: '/system/manage-course'
            },

        ]
    },
    { //quản lý lộ trình
        name: 'menu.admin.roadmap',
        menus: [
            {
                name: 'menu.admin.manage-roadmap', link: '/system/manage-roadmap'
            },

        ]
    },
    { //quản lý cẩm nang
        name: 'menu.admin.blog',
        menus: [
            {
                name: 'menu.admin.manage-blog', link: '/system/manage-blog'
            },

        ]
    },
];