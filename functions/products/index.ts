import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const endpoint: string = process.env.AZURE_COSMOS_ENDPOINT;
const masterKey: string = process.env.AZURE_COSMOS_MASTER_KEY;
const databaseId: string = process.env.AZURE_COSMOS_DATABASE_ID;

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const client: CosmosClient = new CosmosClient({ endpoint, auth: { masterKey }});
    const { container } = await client.database(databaseId)
        .containers.createIfNotExists({ id: "products" });

    if (req.method === "GET") {
        const { result: results } = await container.items
            .query(`
                SELECT
                    r.id, r.productCode, r.description, r.price, r.starRating,
                    r.imageUrl, r.releaseDate, r.productName
                FROM root r`
                ).toArray()

        context.res = {
            status: 200,
            body: results
        };
    } else {
        context.res = {
            status: 400,
            body: "Bad Request"
        };
    }
};

export default httpTrigger;
