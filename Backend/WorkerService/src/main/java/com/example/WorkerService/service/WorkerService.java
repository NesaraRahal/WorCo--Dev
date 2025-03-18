package com.example.WorkerService.service;

import com.example.WorkerService.data.Worker;
import com.example.WorkerService.data.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkerService {

    @Autowired
    private WorkerRepository workerRepo;

    public Worker saveWorker(Worker worker) {
        return workerRepo.save(worker);
    }

    public List<Worker> getWorkers() {
        return workerRepo.findAll();
    }
}
