import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { containers } from '../shared';

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  if (req.method === 'GET') {
    const { result } = await containers.products.items.readAll().toArray();

    context.res = { status: 200, body: result };
    return;
  }

  context.res = { status: 400, body: 'Bad Request' };
};

export default httpTrigger;
