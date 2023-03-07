package com.sbu.hawks.backend.model;

import java.util.List;

public class State {

    private String name;
    private List<District> districts;

    public State(String name, List<District> districts) {
        this.name = name;
        this.districts = districts;
    }

    public String getName() {
        return name;
    }

    public List<District> getDistricts() {
        return districts;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDistricts(List<District> districts) {
        this.districts = districts;
    }
}
