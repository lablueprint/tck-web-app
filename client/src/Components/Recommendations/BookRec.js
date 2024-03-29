import axios from 'axios';
import { gradeRangeMetadata } from '../../Constants';

export default function RecFilter(
  bookId,
  minAge,
  maxAge,
  minGrade,
  maxGrade,
  raceEthnicity,
  genre,
  bookType,
) {
  const filter = () => new Promise((resolve, reject) => {
    const prioMap = new Map();
    axios.get('/api/books')
      .catch((err) => {
        console.err(err);
      // add other error handling
      })
      .then((response) => {
        const records = response.data;
        const finalArr = [];
        records.forEach((record) => {
        // do not check with the identical book
          if (bookId !== record.id) {
            let priority = 0;
            const minGradeIndex = gradeRangeMetadata.indexOf(minGrade, 0);
            const maxGradeIndex = gradeRangeMetadata.indexOf(maxGrade, 0);
            const minGradeIndexRecord = gradeRangeMetadata.indexOf(record.fields.grade_min, 0);
            const maxGradeIndexRecord = gradeRangeMetadata.indexOf(record.fields.grade_max, 0);

            // note: in the future we should add error-checking for bad age/grade input!

            // Matching age range gives 2 points
            if ((minAge <= record.fields.age_max) && (maxAge >= record.fields.age_min)) {
              priority += 2;
            }

            // Matching grade range gives 2 points
            if ((minGradeIndex <= maxGradeIndexRecord) && (maxGradeIndex >= minGradeIndexRecord)) {
              priority += 2;
            }

            // Matching race/ethnicity gives 1 point each
            if (raceEthnicity && record.fields['race/ethnicity']) {
              for (let i = 0; i < raceEthnicity.length; i += 1) {
                if (record.fields['race/ethnicity'].includes(raceEthnicity[i])) {
                  priority += 1;
                }
              }
            }

            // Matching genre gives 1 point each
            if (genre && record.fields.genre) {
              for (let i = 0; i < genre.length; i += 1) {
                if (record.fields.genre.includes(genre[i])) {
                  priority += 1;
                }
              }
            }

            // Matching book_type gives 1 point each
            if (bookType && record.fields.book_type) {
              if (bookType === record.fields.book_type) {
                priority += 1;
              }
            }

            // Storing book ID based on its priority in a Map data structure
            // Key is priority; Value is an array of corresponding bookIDs
            if (prioMap.has(priority)) {
              const array = [];
              const prioList = array.concat(prioMap.get(priority));
              const newPrioList = prioList.concat(record);
              prioMap.set(priority, newPrioList);
            } else {
              prioMap.set(priority, record);
            }
          }
        });
        const sortedArr = [];
        prioMap.forEach((value, key) => {
          sortedArr.push(key);
        });
        sortedArr.sort();
        sortedArr.reverse();

        let counter = 0;
        for (let i = 0; i < sortedArr.length; i += 1) {
          if (counter === 14) {
            break;
          }
          const value = prioMap.get(sortedArr[i]);
          if (Array.isArray(value)) {
            for (let j = 0; j < value.length; j += 1) {
              if (counter === 14) {
                break;
              }
              finalArr.push(value[j]);
              counter += 1;
            }
          } else {
            finalArr.push(value);
            counter += 1;
          }
        }
        resolve(finalArr);
      }, (err) => {
        if (err) { reject(err); }
      });
  });
  return filter();
}

/*
  // Call the function upon first render
  useEffect(() => {
    RecFilter();
  }, []);

  // Re-render once if recList has changed
  useEffect(() => {}, [recList]);
  */
