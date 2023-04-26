package com.sbu.hawks.backend.model;



import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "districts")
public class District {
    @Id
    private String id;
    private int districtNumber;
    private StateCode stateCode;
    private int populationTotal;
    private double totalGeographicArea;
    private Map<Demographic, Integer> demographicSummary;
    private double geographicVariation;
    private double populationVariation;
    private String candidate;
    private PoliticalParty party;

    public District() {
    }

    public District(String id, int districtNumber, StateCode stateCode, int populationTotal,
                    double totalGeographicArea, Map<Demographic, Integer> demographicSummary,
                    double geographicVariation, double populationVariation, String candidate,
                    PoliticalParty party) {
        this.id = id;
        this.districtNumber = districtNumber;
        this.stateCode = stateCode;
        this.populationTotal = populationTotal;
        this.totalGeographicArea = totalGeographicArea;
        this.demographicSummary = demographicSummary;
        this.geographicVariation = geographicVariation;
        this.populationVariation = populationVariation;
        this.candidate = candidate;
        this.party = party;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getDistrictNumber() {
        return districtNumber;
    }

    public void setDistrictNumber(int districtNumber) {
        this.districtNumber = districtNumber;
    }

    public StateCode getStateCode() {
        return stateCode;
    }

    public void setStateCode(StateCode stateCode) {
        this.stateCode = stateCode;
    }

    public int getPopulationTotal() {
        return populationTotal;
    }

    public void setPopulationTotal(int populationTotal) {
        this.populationTotal = populationTotal;
    }

    public double getTotalGeographicArea() {
        return totalGeographicArea;
    }

    public void setTotalGeographicArea(double totalGeographicArea) {
        this.totalGeographicArea = totalGeographicArea;
    }

    public Map<Demographic, Integer> getDemographicSummary() {
        return demographicSummary;
    }

    public void setDemographicSummary(Map<Demographic, Integer> demographicSummary) {
        this.demographicSummary = demographicSummary;
    }

    public double getGeographicVariation() {
        return geographicVariation;
    }

    public void setGeographicVariation(double geographicVariation) {
        this.geographicVariation = geographicVariation;
    }

    public double getPopulationVariation() {
        return populationVariation;
    }

    public void setPopulationVariation(double populationVariation) {
        this.populationVariation = populationVariation;
    }

    public String getCandidate() {
        return candidate;
    }

    public void setCandidate(String candidate) {
        this.candidate = candidate;
    }

    public PoliticalParty getParty() {
        return party;
    }

    public void setParty(PoliticalParty party) {
        this.party = party;
    }
}