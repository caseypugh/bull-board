import { BaseAdapter } from './queueAdapters/base';
import { IServerAdapter } from '../typings/app';
import { getQueuesApi } from './queuesApi';
import { appRoutes } from './routes';
import { errorHandler } from './handlers/error';

export function createBullBoard({
  queues,
  serverAdapter,
}: {
  queues: ReadonlyArray<BaseAdapter>;
  serverAdapter: IServerAdapter;
}) {
  const { bullBoardQueues, setQueues, replaceQueues, addQueue, removeQueue } = getQueuesApi(queues);
  const uiBasePath = "node_modules/@bull-board/ui"
  console.log("SUP IM DIFFERENT NOW ", uiBasePath)
  serverAdapter
    .setQueues(bullBoardQueues)
    .setViewsPath(uiBasePath + '/dist')
    .setStaticPath('/static', uiBasePath + '/dist/static')
    .setEntryRoute(appRoutes.entryPoint)
    .setErrorHandler(errorHandler)
    .setApiRoutes(appRoutes.api);

  return { setQueues, replaceQueues, addQueue, removeQueue };
}
