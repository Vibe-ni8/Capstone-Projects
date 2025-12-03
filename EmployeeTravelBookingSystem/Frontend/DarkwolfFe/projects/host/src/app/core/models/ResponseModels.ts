export interface UserInfo {
    userId: string,
    name: string,
    email: string,
    roleId: string,
    role: string | null,
    departmentId: string,
    phone: string | null,
    location: string
};

export interface UserProfile {
    userId: string,
    name: string,
    roleId: string,
    role: string | null,
    departmentId: string,
    department: string | null,
    serviceLineId: string | null,
    serviceLine: string | null,
    contact:
    {
        email: string,
        phone: string | null,
        location: string | null
    },
    organization:
    {
        reportingTo: EmployeeWithRole | null,
        reportsToHim: Array<EmployeeWithRole>,
        homeManager: EmployeeWithRole | null,
        workManager: EmployeeWithRole | null
    }
};

export interface EmployeeWithRole {
    employeeId: string,
    name: string,
    email: string,
    roleId: string,
    role: string
}