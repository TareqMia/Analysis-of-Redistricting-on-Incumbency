package com.sbu.hawks.backend.model;

public enum StateCode {
    FL,
    GA,
    PA;

    public String getStateCode() {
        return this.name();
    }
}
