import {
  ChainMap,
  ChainName,
  HyperlaneCore,
  HyperlaneRouterDeployer,
  MultiProvider,
} from '@hyperlane-xyz/sdk';

import {
  HelloWorldContracts,
  HelloWorldFactories,
  helloWorldFactories,
} from '../app/contracts';

import { HelloWorldConfig } from './config';

export class HelloWorldDeployer<
  Chain extends ChainName,
> extends HyperlaneRouterDeployer<
  Chain,
  HelloWorldConfig,
  HelloWorldContracts,
  HelloWorldFactories
> {
  constructor(
    multiProvider: MultiProvider<Chain>,
    configMap: ChainMap<Chain, HelloWorldConfig>,
    protected core: HyperlaneCore<Chain>,
  ) {
    super(multiProvider, configMap, helloWorldFactories, {});
  }

  // Custom contract deployment logic can go here
  // If no custom logic is needed, call deployContract for the router
  async deployContracts(chain: Chain, config: HelloWorldConfig) {
    const router = await this.deployContract(chain, 'router', [
      config.connectionManager,
      config.interchainGasPaymaster,
    ]);
    return {
      router,
    };
  }
}
