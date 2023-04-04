package com.sbu.hawks.backend.model;

public enum ElectionResult {
    WON,
    LOST;

    public String getElectionResult() {
        return this.name();
    }
}