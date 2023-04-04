package com.sbu.hawks.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "candidates")
public class Candidate {
    @Id
    @JsonIgnore
    private ObjectId id;
    private String name;
    private PoliticalParty party;
    private StateCode stateCode;
    private int districtNumber;
    private boolean isIncumbent;
    private ElectionResult electionResult;

    public Candidate(String name, PoliticalParty party, StateCode stateCode,
                     int districtNumber, boolean isIncumbent, ElectionResult electionResult) {
        this.name = name;
        this.party = party;
        this.stateCode = stateCode;
        this.districtNumber = districtNumber;
        this.isIncumbent = isIncumbent;
        this.electionResult = electionResult;
        //this.id = name + "-" + stateCode.getStateCode() + "-" + districtNumber;
    }

    public ObjectId getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PoliticalParty getParty() {
        return party;
    }

    public void setParty(PoliticalParty party) {
        this.party = party;
    }

    public StateCode getStateCode() {
        return stateCode;
    }

    public void setStateCode(StateCode stateCode) {
        this.stateCode = stateCode;
    }

    public int getDistrictNumber() {
        return districtNumber;
    }

    public void setDistrictNumber(int districtNumber) {
        this.districtNumber = districtNumber;
    }

    public boolean getIsIncumbent() {
        return isIncumbent;
    }

    public void setIncumbent(boolean incumbent) {
        isIncumbent = incumbent;
    }

    public ElectionResult getElectionResult() {
        return electionResult;
    }

    public void setElectionResult(ElectionResult electionResult) {
        this.electionResult = electionResult;
    }

    @Override
    public String toString() {
        return "Candidate{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", party=" + party +
                ", stateCode=" + stateCode +
                ", districtNumber=" + districtNumber +
                ", isIncumbent=" + isIncumbent +
                ", electionResult=" + electionResult +
                '}';
    }
}
