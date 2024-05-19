import { FormControl, FormGroup,ValidationErrors } from '@angular/forms';

export function startBeforeEntryWorkDateValidator(control: FormControl) {
  const startDate = control.value;
  const entryWorkDate = control.root.get('entryWorkDate')?.value;

  if (!startDate || !entryWorkDate) {
    // אם אחד מתאריכי ההתחלה או העבודה אינם מוגדרים, אין צורך בבדיקה
    return null;
  }

  const isValid = new Date(startDate) >= new Date(entryWorkDate);

  return isValid ? null : { startBeforeEntryWorkDate: true };
}


export function startBeforeEntryWorkDateOnChangeValidator(startDateValue: any, entryWorkDateValue: any): ValidationErrors | null {
    if (!entryWorkDateValue || !startDateValue) {
      return null; // אחד מהערכים חסר או לא תקין, נניח שהבדיקה אינה נדרשת
    }
  
    const entryWorkDate = new Date(entryWorkDateValue);
    const startDate = new Date(startDateValue);
  
    if (entryWorkDate > startDate) {
      return { startBeforeEntryWorkDate: true }; // החזרת השגיאה אם תאריך ההתחלה לפני תאריך העבודה
    }
  
    return null; // התאריך תקין
  }
  

