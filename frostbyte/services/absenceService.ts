export interface AbsenceRecord {
  child: { id: string; name: string };
  startDate: Date;
  endDate: Date;
  reason: { id: string; reason: string };
  comment: string;
}

const absenceData: AbsenceRecord[] = [];

export const AbsenceService = {
  addAbsence: (record: AbsenceRecord) => {
    absenceData.push(record);
    console.log('Absence added:', record);
    console.log('All absences:', absenceData);
  },
  getAllAbsences: () => [...absenceData],
};
