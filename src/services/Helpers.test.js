
import Helpers from './Helpers';

describe ('fromUrlFriendly', function() {

    it ('should correctly decode for url nicely', () => {
        expect(Helpers.fromUrlFriendly('Sydney,+Canterbury,+New+South+Wales,+Australia'))
            .toEqual('Sydney, Canterbury, New South Wales, Australia');
    });

    it ('should correctly encode for url nicely', () => {
        expect(Helpers.fromUrlFriendly('Sydney, Canterbury, New South Wales, Australia'))
            .toEqual('Sydney,+Canterbury,+New+South+Wales,+Australia');
    });

})