package com.sbu.hawks.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.awt.Polygon;
import java.util.List;

public class District {

    private String state;
    private int districtNum;
    @JsonIgnore
    private List<Polygon> boundaryData;


    public District(String state, int districtNum, List<Polygon> boundaryData) {
        this.state = state;
        this.districtNum = districtNum;
        this.boundaryData = boundaryData;
    }

    public int getDistrictNum() {
        return districtNum;
    }

    public List<Polygon> getBoundaryData() {
        return boundaryData;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setDistrictNum(int districtNum) {
        this.districtNum = districtNum;
    }

    public void setBoundaryData(List<Polygon> boundaryData) {
        this.boundaryData = boundaryData;
    }
}

