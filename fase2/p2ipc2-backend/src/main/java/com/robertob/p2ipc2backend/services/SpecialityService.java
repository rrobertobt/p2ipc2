package com.robertob.p2ipc2backend.services;

import com.robertob.p2ipc2backend.database.SpecialityRepository;
import com.robertob.p2ipc2backend.models.Speciality;

import java.util.List;

public class SpecialityService {
    private final SpecialityRepository specialityRepository;

    public SpecialityService() {
        this.specialityRepository = new SpecialityRepository();
    }

    public List<Speciality> findAll() {
        return specialityRepository.findAll();
    }
}
