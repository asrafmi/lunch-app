import { apiRequest } from '@/infrastructure/api-request';
import { backendRequest } from '@/infrastructure/backend-request';
import to from 'await-to-js';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useProvince = () => {
  const [province, setProvince] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProvince = async () => {
      setIsLoading(true);

      const [err, response] = await to(apiRequest.get('/province'));
      if (err) {
        setError(err.message);
        setIsLoading(false);
        return;
      }

      setProvince(response.data);
      setIsLoading(false);
    };

    fetchProvince();
  }, []);

  return { province, isLoading, error };
};

const useCity = (provinceId: string) => {
  const [city, setCity] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCity = async () => {
      setIsLoading(true);

      const [err, response] = await to(apiRequest.get(`/city/${provinceId}`));
      if (err) {
        setError(err.message);
        setIsLoading(false);
        return;
      }

      setCity(response.data);
      setIsLoading(false);
    };

    fetchCity();
  }, [provinceId]);

  return { city, isLoading, error };
};

const useDistrict = (cityId: string) => {
  const [district, setDistrict] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchDistrict = async () => {
      setIsLoading(true);

      const [err, response] = await to(apiRequest.get(`/district/${cityId}`));

      if (err) {
        setError(err.message);
        setIsLoading(false);
        return;
      }

      setDistrict(response.data);
      setIsLoading(false);
    };

    fetchDistrict();
  }, [cityId]);

  return { district, isLoading, error };
};

export { useProvince, useCity, useDistrict };
