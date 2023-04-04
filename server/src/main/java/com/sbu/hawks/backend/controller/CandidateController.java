package com.sbu.hawks.backend.controller;

import com.sbu.hawks.backend.model.Candidate;
import com.sbu.hawks.backend.model.StateCode;
import com.sbu.hawks.backend.service.CandidateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    private final CandidateService candidateService;


    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping
    public List<Candidate> getAllCandidates() {
        return candidateService.getAllCandidates();
    }

    @GetMapping("/state/{stateCode}")
    public List<Candidate> getCandidatesByStateCode(@PathVariable StateCode stateCode) {
        return candidateService.getCandidatesByStateCode(stateCode);
    }

    @GetMapping("/state/{stateCode}/district/{districtNumber}")
    public List<Candidate> getCandidatesByStateCodeAndDistrict(@PathVariable StateCode stateCode,
                                                               @PathVariable int districtNumber) {
        return candidateService.getCandidatesByStateCodeAndDistrict(stateCode, districtNumber);
    }

    @GetMapping("/state/{stateCode}/district/{districtNumber}/winner")
    public Candidate getDistrictWinner(@PathVariable StateCode stateCode, @PathVariable int districtNumber) {
        return candidateService.getCandidateByStateCodeAndDistrict(stateCode, districtNumber);
    }

    @PostMapping
    public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate candidate) {
        Candidate savedCandidate = candidateService.saveCandidate(candidate);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCandidate);
    }





}
