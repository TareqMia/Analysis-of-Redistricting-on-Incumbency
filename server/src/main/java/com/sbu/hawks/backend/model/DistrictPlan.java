package com.sbu.hawks.backend.model;

import java.util.List;

import org.springframework.data.annotation.Id;

public class DistrictPlan {
    @Id
    private StateCode stateCode;
    private List<District> districts;
    private String planName;
    private PlanType planType;
    private PoliticalParty createdBy;

    public DistrictPlan(StateCode stateCode, List<District> districts, String planName,
                        PlanType planType, PoliticalParty createdBy) {
        this.stateCode = stateCode;
        this.districts = districts;
        this.planName = planName;
        this.planType = planType;
        this.createdBy = createdBy;
    }

    public StateCode getStateCode() {
        return stateCode;
    }

    public void setStateCode(StateCode stateCode) {
        this.stateCode = stateCode;
    }

    public List<District> getDistricts() {
        return districts;
    }

    public void setDistricts(List<District> districts) {
        this.districts = districts;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public PlanType getPlanType() {
        return planType;
    }

    public void setPlanType(PlanType planType) {
        this.planType = planType;
    }

    public PoliticalParty getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(PoliticalParty createdBy) {
        this.createdBy = createdBy;
    }
}
