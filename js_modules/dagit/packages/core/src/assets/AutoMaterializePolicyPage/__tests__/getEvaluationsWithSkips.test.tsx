import {buildAutoMaterializeAssetEvaluationRecord} from '../../../graphql/types';
import {getEvaluationsWithSkips} from '../AssetAutomaterializePolicyPage';

describe('getEvaluationsWithSkips', () => {
  it('should return an empty array if isLoading is true', () => {
    const evaluations = [
      buildAutoMaterializeAssetEvaluationRecord({
        id: '3',
        evaluationId: 3,
        numRequested: 1,
        numSkipped: 0,
        numDiscarded: 0,
        timestamp: Date.now() / 1000 - 60 * 5,
        conditions: [],
      }),
      buildAutoMaterializeAssetEvaluationRecord({
        id: '2',
        evaluationId: 2,
        numRequested: 1,
        numSkipped: 0,
        numDiscarded: 0,
        timestamp: Date.now() / 1000 - 60 * 4,
        conditions: [],
      }),
    ];

    const actual = getEvaluationsWithSkips({
      evaluations,
      currentEvaluationId: 3,
      isFirstPage: false,
      isLastPage: false,
      isLoading: true,
    });

    expect(actual).toEqual([]);
  });

  it(
    'should return a skipped entry on top if its the first page and the currentEvaluationId is greater' +
      "than the last evaluation's ID + at the bottom if its the last page and the last evaluation ID is not 1",
    () => {
      const evaluations = [
        buildAutoMaterializeAssetEvaluationRecord({
          id: '3',
          evaluationId: 3,
          numRequested: 1,
          numSkipped: 0,
          numDiscarded: 0,
          timestamp: Date.now() / 1000 - 60 * 4,
          conditions: [],
        }),
        buildAutoMaterializeAssetEvaluationRecord({
          id: '2',
          evaluationId: 2,
          numRequested: 1,
          numSkipped: 0,
          numDiscarded: 0,
          timestamp: Date.now() / 1000 - 60 * 5,
          conditions: [],
        }),
      ];

      const actual = getEvaluationsWithSkips({
        evaluations,
        currentEvaluationId: 10,
        isFirstPage: true,
        isLastPage: true,
        isLoading: false,
      });

      expect(actual).toEqual([
        {
          __typename: 'no_conditions_met',
          amount: 7,
          startTimestamp: evaluations[0].timestamp + 60,
          endTimestamp: 'now',
        },
        ...evaluations,
        {
          __typename: 'no_conditions_met',
          amount: 1,
          endTimestamp: evaluations[1].timestamp - 60,
          startTimestamp: 0,
        },
      ]);
    },
  );

  it('should return a skipped entry in between if records skip an evaluation ID', () => {
    const evaluations = [
      buildAutoMaterializeAssetEvaluationRecord({
        id: '3',
        evaluationId: 3,
        numRequested: 1,
        numSkipped: 0,
        numDiscarded: 0,
        timestamp: Date.now() / 1000 - 60 * 4,
        conditions: [],
      }),
      buildAutoMaterializeAssetEvaluationRecord({
        id: '1',
        evaluationId: 1,
        numRequested: 1,
        numSkipped: 0,
        numDiscarded: 0,
        timestamp: Date.now() / 1000 - 60 * 5,
        conditions: [],
      }),
    ];

    const actual = getEvaluationsWithSkips({
      evaluations,
      currentEvaluationId: 3,
      isFirstPage: true,
      isLastPage: true,
      isLoading: false,
    });

    expect(actual).toEqual([
      evaluations[0],
      {
        __typename: 'no_conditions_met',
        amount: 1,
        endTimestamp: evaluations[0].timestamp - 60,
        startTimestamp: evaluations[1].timestamp + 60,
      },
      evaluations[1],
    ]);
  });
});
