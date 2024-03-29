package com.sbu.hawks.backend.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.sbu.hawks.backend.model.Ensemble;
import com.sbu.hawks.backend.model.State;
import com.sbu.hawks.backend.model.StateCode;
import org.springframework.stereotype.Repository;

@Repository
public interface EnsembleRepository extends MongoRepository<Ensemble, StateCode> {

}