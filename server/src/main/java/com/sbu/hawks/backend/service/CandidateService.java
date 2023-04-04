package com.sbu.hawks.backend.service;

import com.sbu.hawks.backend.model.Candidate;
import com.sbu.hawks.backend.model.StateCode;
import com.sbu.hawks.backend.repository.CandidateRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {
    private final CandidateRepository candidateRepository;

    @Autowired
    public CandidateService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }


    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public List<Candidate> getCandidatesByStateCode(StateCode stateCode) {
        return candidateRepository.findCandidatesByStateCode(stateCode);
    }

    public List<Candidate> getCandidatesByStateCodeAndDistrict(StateCode stateCode, int districtNumber) {
        return candidateRepository.findCandidatesByStateCodeAndDistrictNumber(stateCode, districtNumber);
    }

    public Candidate getCandidateByStateCodeAndDistrict(StateCode stateCode, int districtNumber)  {
        return candidateRepository.findFirstByStateCodeAndDistrictNumber(stateCode, districtNumber);
    }

    public Candidate saveCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    public void deleteCandidate(ObjectId id) {
        candidateRepository.deleteById(id);
    }


}
