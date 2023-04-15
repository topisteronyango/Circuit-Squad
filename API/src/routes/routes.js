const express = require('express');
const router = express.Router();

const { requireDoctorAuthorization } = require('../middleware/doctor.authorization.middleware');
const { requireHospitalAuthorization } = require('../middleware/hospital.authorization.middleware');
const { requireMinistryOfHealthAuthorization } = require('../middleware/ministryOfHealth.authorization.middleware');
const { requirePatientAuthorization } = require('../middleware/patient.authorization.middleware');
const { requireHospitalMOHAuthorization } = require('../middleware/hospital.moh.authorization');
const { requireDocHosMOHAuthorization } = require('../middleware/doc.hos.moh.authorization');
const { requireInsuaranceCompanyAuthorization } = require('../middleware/insuaranceCompany.authorization')

const { 
        registerDoctor, 
        loginDoctor, 
        getDoctor, 
        getDoctors, 
        updateDoctor, 
        deleteDoctor 
    } = require('../controller/doctor.controller');

const { 
        registerHospital, 
        loginHospital, 
        getHospital, 
        getHospitals, 
        updateHospital, 
        deleteHospital 
    } = require('../controller/hospital.controller');

const { 
        registerPatient, 
        loginPatient, 
        getPatient, 
        getPatients, 
        updatePatient, 
        deletePatient 
    } = require('../controller/patient.controller');

const {
        registerMinistryOfHealth,
        loginMinistryOfHealth,
        updateMinistryOfHealth,
        deleteMinistryOfHealth
    } = require('../controller/ministryOfHealth.controller');

const {
        registerInsuaranceCompany,
        loginInsuaranceCompany,
        getInsuaranceCompanies,
        getInsuaranceCompany,
        updateInsuaranceCompany,
        deleteInsuaranceCompany
    } = require('../controller/insuaranceCompany.controller');

const { 
        createAppointment, 
        getAppointments, 
        getAppointmentsByDate,
        getDoctorAppointments,
        getPatientAppointments, 
        updateAppointment, 
        deleteAppointment 
    } = require('../controller/appointment.controller');

const {
        createDiagnosis,
        getADiagnosis,
        getAllDiagnosis,
        getPatientDiagnosis,
        updateDiagnosis,
        deleteDiagnosis
    } = require('../controller/diagnosis.controller');


const {
        createMedication,
        getAllMedications,
        getMedication,
        updateMedication,
        deleteMedication
    } = require('../controller/medication.controller'); 

const {
    createServicePayment,
    createMedicationPayment,
    getAllPayments,
    getPayment,
    updatePayment,
    deletePayment
} = require('../controller/payment.controller');

const {
        createService,
        getService,
        getServices,
        updateService,
        deleteService
    } = require('../controller/service.controller');

// doctor routes
router.post('/doctor/register/:hospitalId', registerDoctor);
router.post('/doctor/login', loginDoctor);
router.get('/doctor/:id', requireDocHosMOHAuthorization, getDoctor);
router.get('/doctors', requireHospitalMOHAuthorization, getDoctors);
router.put('/doctor/:id', requireDoctorAuthorization, updateDoctor);
router.delete('/doctor/:id', requireHospitalMOHAuthorization, deleteDoctor);

//hospital routes
router.get('/hospitals', requireMinistryOfHealthAuthorization, getHospitals);
router.get('/hospital/:id', requireMinistryOfHealthAuthorization, getHospital);
router.post('/hospital/register/:ministryOfHealthId', registerHospital);
router.post('/hospital/login', loginHospital);
router.put('/hospital/:id', requireHospitalAuthorization, updateHospital);
router.delete('/hospital/:id', requireMinistryOfHealthAuthorization, deleteHospital);

//patient routes
router.get('/patients', requireDocHosMOHAuthorization, getPatients);
router.get('/patient/:id', getPatient);
router.post('/patient/register/:hospitalId/:insuranceCompanyId', registerPatient);
router.post('/patient/login', loginPatient);
router.put('/patient/:id', requirePatientAuthorization, updatePatient);
router.delete('/patient/:id', requireHospitalMOHAuthorization, deletePatient);

//ministry of health routes
router.post('/ministryOfHealth/register', registerMinistryOfHealth);
router.post('/ministryOfHealth/login', loginMinistryOfHealth);
router.put('/ministryOfHealth/:id', requireMinistryOfHealthAuthorization, updateMinistryOfHealth);
router.delete('/ministryOfHealth/:id', requireMinistryOfHealthAuthorization, deleteMinistryOfHealth);

//insuarance company routes
router.get('/insuaranceCompany/:id', requireHospitalMOHAuthorization, getInsuaranceCompany);
router.get('/insuaranceCompanies', requireHospitalMOHAuthorization, getInsuaranceCompanies);
router.post('/insuaranceCompany/register', registerInsuaranceCompany);
router.post('/insuaranceCompany/login', loginInsuaranceCompany);
router.put('/insuaranceCompany/:id', requireInsuaranceCompanyAuthorization, updateInsuaranceCompany);
router.delete('/insuaranceCompany/:id', deleteInsuaranceCompany);

//appointment routes
router.get('/appointments', getAppointments);
router.get('/appointments/:date', getAppointmentsByDate);
router.get('/appointments/doctor/:doctorId', getDoctorAppointments);
router.get('/appointments/patient/:patientId', getPatientAppointments);
router.post('/appointment/:doctorId/:patientId', createAppointment);
router.put('/appointment/:id', updateAppointment);
router.delete('/appointment/:id', deleteAppointment);

//diagnosiis routes
router.get('/diagnosis', getAllDiagnosis);
router.get('/diagnosis/:id', getADiagnosis);
router.get('/diagnosis/patient/:patientId', getPatientDiagnosis);
router.post('/diagnosis/:patientId/:doctorId/:appointmentId', createDiagnosis);
router.put('/diagnosis/:id', requireDocHosMOHAuthorization, updateDiagnosis);
router.delete('/diagnosis/:id', requireHospitalMOHAuthorization, deleteDiagnosis)

//medication routes
router.get('/medications', getAllMedications);
router.get('/medication/:id', getMedication);
router.post('/medication/:diagnosisId', createMedication);
router.put('/medication/:id', requireDocHosMOHAuthorization, updateMedication);
router.delete('/medication/:id', requireHospitalMOHAuthorization, deleteMedication);

//payment routes
router.get('/payments', getAllPayments);
router.get('/payment/:id', getPayment);
router.post('/payment/:serviceId', createServicePayment);
router.post('/payment/:medicationId', createMedicationPayment);
router.put('/payment/:id', updatePayment);
router.delete('/payment/:id', requireHospitalMOHAuthorization, deletePayment);

//services route
router.get('/services', getServices);
router.get('/service/:id', getService);
router.post('/service/:appointmentId', createService);
router.put('/service/:id', updateService);
router.delete('/service/:id', requireHospitalMOHAuthorization, deleteService);

module.exports = router;