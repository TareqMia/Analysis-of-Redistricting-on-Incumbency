package com.sbu.hawks.backend.model;

public class Candidate {
    private String candidateName;
    private PoliticalParty candidateParty;
    private StateCode candidateState;
    private String districtNumber;
    private boolean isIncumbent;
    private ElectionResult electionResult;

    public Candidate(String candidateName, PoliticalParty candidateParty, StateCode candidateState,
                     String districtNumber, boolean isIncumbent, ElectionResult electionResult) {
        this.candidateName = candidateName;
        this.candidateParty = candidateParty;
        this.candidateState = candidateState;
        this.districtNumber = districtNumber;
        this.isIncumbent = isIncumbent;
        this.electionResult = electionResult;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public PoliticalParty getCandidateParty() {
        return candidateParty;
    }

    public StateCode getCandidateState() {
        return candidateState;
    }

    public String getDistrictNumber() {
        return districtNumber;
    }

    public boolean isIncumbent() {
        return isIncumbent;
    }

    public ElectionResult getElectionResult() {
        return electionResult;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public void setCandidateParty(PoliticalParty candidateParty) {
        this.candidateParty = candidateParty;
    }

    public void setCandidateState(StateCode candidateState) {
        this.candidateState = candidateState;
    }

    public void setDistrictNumber(String districtNumber) {
        this.districtNumber = districtNumber;
    }

    public void setIncumbent(boolean incumbent) {
        isIncumbent = incumbent;
    }

    public void setElectionResult(ElectionResult electionResult) {
        this.electionResult = electionResult;
    }
}
