export interface IBank {
    bankId ?: string,
    bankName: string,
    shortCode: string,
    status ?: boolean
}

export interface IDesignation {
    designationId ?: string,
    designationType: string,
    designationName: string,
    shortCode: string,
    status ?: boolean
}

export interface IZone {
    zoneId ?: string,
    zoneName: string,
    shortCode: string,
    status ?: boolean
}

export interface IUserRole {
    roleId ?: string,
    roleName: string,
    status ?: boolean
}

export interface ILocationType {
    locTypeId ?: string,
    locationTypeName: string,
    shortCode: string,
    status ?: boolean
}

export interface ILeaveReasonType {
    leaveReasonTypeId ?: string,
    reasonType: string,
    shortCode: string,
    status ?: boolean
}

export interface IHRA {
    hraId ?: string,
    hraValue: string,
    status ?: boolean
}


export interface ISection {
    sectionId ?: string,
    sectionName: string,
    shortCode: string,
    status ?: boolean
}


// ----------------------------------------- start date 01-22 -------------------------------------------------------------------

export interface IDistrict {
    districtId ?: string,
    zoneId ?: number,
    districtName: string,
    shortCode: string,
    status ?: boolean
}
export interface IState {
    stateId ?: number,
    stateName ?: number,
    shortCode: string,
    status ?: boolean
}
export interface IFinancialYear {
    fyId ?: string,
    financialYear : string,
    shortCode ?: string,
    fyFrom ?: string,
    fyTo ?: string,
    status ?: boolean
}

export interface IMonth {
    monthId ?: string,
    fyId : number,
    monthName : string,
    attendanceStatus ?: boolean,
    salaryStatus ?: boolean,
    userId: number,
    status ?: boolean
}


export interface ILeaveLimit {
    empLeaveApplicableId ?: string,
    leaveTypeId : number,
    empTypeId : number,
    perMonthLeaveAllowed ?: number,
    maxLeaveAllowed ?: number,
    carryForwardMaxLimit ?: number,
    status ?: boolean
}

export interface ILeaveType {
    leaveTypeId ?: string,
    leaveTypeName : string,
    genderApplicable ?: number,
    carryForwardStats ?: number | boolean,
    shortCode ?: string
}

export interface ILocation {
    locationId ?: string,
    locationName : string,
    locTypeId :  string,
    stateId: string,
    districtId : string,
    shortCode : string,
    locationCategory : string
}

