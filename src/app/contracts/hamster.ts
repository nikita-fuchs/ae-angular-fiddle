export class Contract {
  public contractUID: string = '';
  public code: string;
  public showInTabs: boolean = true;
  public nameInTab: string = 'CryptoHamster';
  public shareId: string = '';
  public activeTab: boolean = false;
  public errorHighlights: any;
  public sharingHighlighters: any[] = [];
  public latestACI: any;

  constructor(params: { [key: string]: any }) {
    this.contractUID = String(Date.now());
    params._latestAcI != undefined ? (this.latestACI = params._latestAcI) : true;
    params._nameInTab != undefined ? (this.nameInTab = params._nameInTab) : true;
    params._shareId != undefined ? (this.shareId = params._shareId) : true;
    params._code != undefined
      ? (this.code = params._code)
      : (this.code = `
@compiler >= 6

include "String.aes"

contract CryptoHamster =

    record state = {
        index : int, 
        map_hamsters : map(string, hamster), 
        testvalue: int}

    record hamster = {
        id : int,
        name : string,
        dna : int}

    stateful entrypoint init() = 
        { index = 1,
            map_hamsters = {},
            testvalue = 42}
    
    public entrypoint read_test_value() : int =
        state.testvalue
    
    public entrypoint return_caller() : address =
        Call.caller

    public entrypoint cause_error() : unit =
        require(2 == 1, "require failed") 

    public stateful entrypoint add_test_value(one: int, two: int) : int =
        put(state{testvalue = one + two})
        one + two
    
    public entrypoint locally_add_two(one: int, two: int) : int =
        one + two
    
    public stateful entrypoint statefully_add_two(one: int, two: int) : int=
        put(state{testvalue = one + two})
        state.testvalue
    
    stateful entrypoint create_hamster(hamster_name: string) =
        require(!name_exists(hamster_name), \"Name is already taken\")
        let dna : int = generate_random_dna(hamster_name)
        create_hamster_by_name_dna(hamster_name, dna)

    entrypoint name_exists(name: string) : bool =
        Map.member(name, state.map_hamsters)

    entrypoint get_hamster_dna(name: string, test: option(int)) : int =
        require(name_exists(name), \"There is no hamster with that name!\")

        let needed_hamster : hamster = state.map_hamsters[name]

        needed_hamster.dna

    private stateful function create_hamster_by_name_dna(name: string, dna: int) =
        let new_hamster : hamster = {
            id = state.index,
            name = name,
            dna = dna}

        put(state{map_hamsters[name] = new_hamster})
        put(state{index = (state.index + 1)})

    private function generate_random_dna(name: string) : int =
        get_block_hash_bytes_as_int() - Chain.timestamp + state.index

    private function get_block_hash_bytes_as_int() : int =
        switch(Chain.block_hash(Chain.block_height - 1))
            None => abort(\"blockhash not found\")
            Some(bytes) => Bytes.to_int(bytes)

    entrypoint test(name: string) : hash =
        String.sha3(name)`);
  }

  //experimental
  public showInTabsOrNot(): boolean {
    return this.showInTabs;
  }
}
