package com.sbu.hawks.backend.service;

import com.sbu.hawks.backend.model.Candidate;
import com.sbu.hawks.backend.model.District;
import com.sbu.hawks.backend.model.StateCode;
import com.sbu.hawks.backend.repository.CandidateRepository;
import com.sbu.hawks.backend.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DistrictService {
    private final DistrictRepository districtRepository;
    private final CandidateRepository candidateRepository;

    @Autowired
    public DistrictService(DistrictRepository districtRepository, CandidateRepository candidateRepository) {
        this.districtRepository = districtRepository;
        this.candidateRepository = candidateRepository;
    }

    public District getDistrictByStateCodeAndDistrictNumber(StateCode stateCode, int districtNumber) {
        return districtRepository.getDistrictByStateCodeAndDistrictNumber(stateCode, districtNumber);
    }

    public List<District> getIncumbentsByState(StateCode stateCode) {
        List<Candidate> incumbents = candidateRepository.findCandidatesByStateCodeAndIsIncumbent(stateCode, true);
        List<District> districts = new ArrayList<>();
        for (Candidate incumbent : incumbents) {
            District district = districtRepository.getDistrictByStateCodeAndDistrictNumber(incumbent.getStateCode(),
                    incumbent.getDistrictNumber());
            district.setCandidate(incumbent);
            districts.add(district);
        }
        return districts;
    }


}
