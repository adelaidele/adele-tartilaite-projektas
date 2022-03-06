import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import APIService from '../../../services/api-service';

const searchParamsToObject = (searchParams) => {
  const paramsObject = {};
  searchParams.forEach((value, key) => {
    if (paramsObject[key]) {
      paramsObject[key].push(value);
    } else {
      paramsObject[key] = [value];
    }
  });
  return paramsObject;
};

const useFilters = (selectedGenre) => {
  const [searchParams, setSearchParams] = useSearchParams(); 
  const [filters, setFilters] = useState([]);

  const syncToUrlParams = (newFilters) => {
    const urlParams = searchParamsToObject(searchParams);
    newFilters.forEach((filter) => {
      switch (filter.type) {
        case 'range':
          if (filter.currMin > filter.min) {
            urlParams[`${filter.name}_min`] = filter.currMin;
          } else {
            delete urlParams[`${filter.name}_min`];
          }
          if (filter.currMax < filter.max) {
            urlParams[`${filter.name}_max`] = filter.currMax;
          } else {
            delete urlParams[`${filter.name}_max`];
          }
          break;
        default:
          break;
      }
    });
    setSearchParams(urlParams);
  };

  const changeRangeFilter = (filter, [min, max]) => ({
    ...filter,
    currMin: min,
    currMax: max,
  });

  const changeFilterMap = {
    range: changeRangeFilter,
  };

  const changeFilter = (id, type, props) => {
    const updatedFilters = filters.map((filter) => (
      filter.id === id
        ? changeFilterMap[type](filter, props)
        : filter));
    setFilters(updatedFilters);
    syncToUrlParams(updatedFilters);
  };

  const configureFilters = (filtersData) => filtersData.map((filter) => { 
    const configuredFilter = { ...filter };
    switch (filter.type) {
      case 'range':
        configuredFilter.currMin = configuredFilter.min;
        configuredFilter.currMax = configuredFilter.max;
        break;
      default:
        break;
    }

    return configuredFilter;
  });

  const syncFromUrlParams = (configuredFilters) => { //pagal query url parametrus konstruojam naujus filtrus
    configuredFilters.forEach((filter) => {
      const filterRef = filter; //mutuojant reiksme mes turim prisikirti ja i kintamaji
      const urlOptions = searchParams.getAll(filter.name); // pasiemam QUERY PARAMTERUS PAGAL FILTRO PAVADINIMA
      const minUrlOption = searchParams.get(`${filter.name}_min`); //MIN URL QUERY PARAM
      const maxUrlOption = searchParams.get(`${filter.name}_max`); //MAX URL QUERY PARAM

      if ([...urlOptions, minUrlOption, maxUrlOption].length > 0) { //CHECKAS PAZIURETI AR QUERY PARAMTERAI EGZISTUOJA
        switch (filter.type) {
          case 'range':
            if (minUrlOption) {
              filterRef.currMin = Number(minUrlOption); //SUSIEJAM FILTRO CURRMIN REIKSME SU ATITINKAMA REIKSME IS URL
            }
            if (maxUrlOption) {
              filterRef.currMax = Number(maxUrlOption);//SUSIEJAM FILTRO CURRMIN REIKSME SU ATITINKAMA REIKSME IS URL
            }
            break;
          default:
            break;
        }
      }
    });

    return configuredFilters;
  };

  const getFiltersByGenre = async (genreId) => { //gauname filtrus pagal pasirinkta zanra
    const filtersData = await APIService.fetchFilters(genreId); //gauname filtrus pagal pasirinkta zanra
    const configuredFilters = configureFilters(filtersData); //gauname filtrus su nustatytais nauajais propsais

    const syncedFilters = syncFromUrlParams(configuredFilters);

    return syncedFilters;
  };

  useEffect(() => {
    if (selectedGenre) {
      (async () => {
        const configuredFilters = await getFiltersByGenre(selectedGenre);
        setFilters(configuredFilters);
      })();
    }
  }, [selectedGenre]);

  return { filters, changeFilter };
};

export default useFilters; 