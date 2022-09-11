import { useApolloClient } from '@apollo/client';
import {
  PresignedUrlS3Mutation,
  PresignedUrlS3MutationVariables,
  PresignedUrlS3Document,
  PresignedUrlDto,
} from './../../generated/schemas';

const useAsyncQuery = () => {
  const client = useApolloClient();

  const getPresignedUrl = async (presignedUrlDto: PresignedUrlDto) =>
    client.mutate<PresignedUrlS3Mutation, PresignedUrlS3MutationVariables>({
      mutation: PresignedUrlS3Document,
      variables: {
        presignedUrlDto,
      },
    });

  return {
    getPresignedUrl,
  };
};

export default useAsyncQuery;
