
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
    stateId ?: string,
    districtName: string,
    shortCode: string,
    status ?: boolean
}
export interface IState {
    stateId ?: string,
    stateName ?: string,
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


export interface IVendorDetails {
    vendorId ?: string,
    vendorName: String,
    emailId: string,
    panNo: string,
    regOfficeAddress: string,
    regStateId: string,
    approvalStatus: string,
    approveByEmpId?: string,
    approveDateTime?: string
}
export interface IApplyLeave{
    leaveApplyId ?: string,
    leaveTypeId : number,
    empId: number,
    empLeaveApplicableId: number,
    dateFrom: string,
    dateTo: string,
    leaveDayStatus: boolean
}

export interface IEmployee {
    empId ?: number,
    empName: string,
    empFatherName: string,
    dob: string,
    mobNo: number,
    emailId: string,
    gender: string,
    image: string,
    whatsAppNo: number,
    designationId: number,
    address1: string,
    address2: string,
    districtId: number,
    stateId: number,
    pinCode: string,
    esiNo: string,
    pfNo: string,
    serviceStatus: string,
    status: boolean,
    doj: string,
    joiningStateId: number,
    stateName: string,
    joiningDistId: number,
    districtName: string,
    locationId: number,
    locationName: string,
    cl: string,
    el: string,
    sl: string,
    pl: string,
    panNo: string,
    channel: string,
    entity: string,
    aadharNo: number,
    bankName: number,
    ifscCode: string,
    accountNo: string,
    officialEmailId: string,
    empDesigStatus: number,
    registrationDate: string,
    expDate: string
}
