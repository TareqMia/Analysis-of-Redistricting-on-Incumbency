package com.sbu.hawks.backend.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.sbu.hawks.backend.model.Ensemble;
import com.sbu.hawks.backend.model.State;
import com.sbu.hawks.backend.model.StateCode;

public interface EnsembleRepository extends MongoRepository<Ensemble, StateCode> {
    EnsembleRepository getEnsembleByStateandStateCode(State state, StateCode stateCode);
}